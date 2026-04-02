<?php
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/auth_middleware.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed', [], 405);
}

$user = authenticate(); // returns user from token, or exits with 401

$body       = getRequestBody();
$courseSlug = sanitize($body['course_slug'] ?? '');

if (empty($courseSlug)) {
    respond(false, 'Course slug is required.', [], 400);
}

$db = getDB();

// Check if already enrolled
$stmt = $db->prepare('SELECT id FROM enrollments WHERE user_id = ? AND course_slug = ?');
$stmt->execute([$user['id'], $courseSlug]);
if ($stmt->fetch()) {
    respond(false, 'You are already enrolled in this course.', [], 409);
}

$db->prepare(
    'INSERT INTO enrollments (user_id, course_slug, enrolled_at) VALUES (?, ?, NOW())'
)->execute([$user['id'], $courseSlug]);

respond(true, 'Enrollment successful! Go to your dashboard to start learning.', [], 201);
?>
