<?php
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed', [], 405);
}

$body    = getRequestBody();
$name    = sanitize($body['name'] ?? '');
$email   = sanitize($body['email'] ?? '');
$phone   = sanitize($body['phone'] ?? '');
$subject = sanitize($body['subject'] ?? '');
$message = sanitize($body['message'] ?? '');
$type    = sanitize($body['type'] ?? 'contact');

if (empty($name) || empty($email) || empty($message)) {
    respond(false, 'Name, email, and message are required.', [], 400);
}

if (!validateEmail($email)) {
    respond(false, 'Invalid email address.', [], 400);
}

$db = getDB();
$db->prepare(
    'INSERT INTO contacts (name, email, phone, subject, message, type, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())'
)->execute([$name, $email, $phone, $subject, $message, $type]);

respond(true, 'Message received! We\'ll be in touch shortly.');
?>
