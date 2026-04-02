<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed. Use POST.', [], 405);
}

$body     = getRequestBody();
$email    = sanitize($body['email'] ?? '');
$password = $body['password'] ?? '';

if (empty($email) || empty($password)) {
    respond(false, 'Email and password are both required.', [], 400);
}

if (!validateEmail($email)) {
    respond(false, 'Please enter a valid email address.', [], 400);
}

try {
    $db = getDB();
} catch (Exception $e) {
    respond(false, 'Database connection failed.', [], 500);
}

$stmt = $db->prepare(
    'SELECT id, name, email, phone, password_hash FROM users WHERE email = ? LIMIT 1'
);
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    respond(false, 'Invalid email or password. Please try again.', [], 401);
}

$token = generateToken((int) $user['id'], $user['email'], $user['name']);

respond(true, 'Login successful. Welcome back!', [
    'token' => $token,
    'user'  => [
        'id'    => (int) $user['id'],
        'name'  => $user['name'],
        'email' => $user['email'],
        'phone' => $user['phone'] ?? '',
    ],
]);
