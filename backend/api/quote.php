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
$company = sanitize($body['company'] ?? '');
$service = sanitize($body['service'] ?? '');
$budget  = sanitize($body['budget'] ?? '');
$message = sanitize($body['message'] ?? '');

if (empty($name) || empty($email) || empty($service)) {
    respond(false, 'Name, email, and service are required.', [], 400);
}

if (!validateEmail($email)) {
    respond(false, 'Invalid email address.', [], 400);
}

$db = getDB();
$db->prepare(
    'INSERT INTO quotes (name, email, phone, company, service, budget, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())'
)->execute([$name, $email, $phone, $company, $service, $budget, $message]);

respond(true, 'Quote request received! Our team will contact you within 24 hours.');
?>
