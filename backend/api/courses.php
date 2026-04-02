<?php
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/auth_middleware.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    respond(false, 'Method not allowed', [], 405);
}

$user = authenticate(); // exits with 401 when invalid
$userId = (int) ($user['id'] ?? 0);

$db = getDB();
$stmt = $db->prepare('SELECT course_slug FROM enrollments WHERE user_id = ?');
$stmt->execute([$userId]);
$rows = $stmt->fetchAll();
$slugs = array_map(fn($r) => $r['course_slug'], $rows);

respond(true, 'Fetched enrolled courses', ['course_slugs' => $slugs], 200);

