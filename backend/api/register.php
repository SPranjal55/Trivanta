<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed. Use POST.', [], 405);
}

// Read and validate body
$body = getRequestBody();

$name            = sanitize($body['name'] ?? '');
$email           = sanitize($body['email'] ?? '');
$phone           = sanitize($body['phone'] ?? '');
$password        = $body['password'] ?? '';
$confirmPassword = $body['confirm_password'] ?? '';

// Validate required fields
if (empty($name)) {
    respond(false, 'Full name is required.', [], 400);
}

if (empty($email)) {
    respond(false, 'Email address is required.', [], 400);
}

if (!validateEmail($email)) {
    respond(false, 'Please enter a valid email address.', [], 400);
}

if (empty($password)) {
    respond(false, 'Password is required.', [], 400);
}

if (empty($confirmPassword)) {
    respond(false, 'Please confirm your password.', [], 400);
}

if ($password !== $confirmPassword) {
    respond(false, 'Passwords do not match. Please try again.', [], 400);
}

if (!validatePassword($password)) {
    respond(false, 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.', [], 400);
}

// Check database connection and existing email
try {
    $db = getDB();
} catch (Exception $e) {
    respond(false, 'Database connection failed. Please try again later.', [], 500);
}

$stmt = $db->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);

if ($stmt->fetch()) {
    respond(false, 'An account with this email already exists. Please login instead.', [], 409);
}

// Hash password and insert user
$passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

try {
    $stmt = $db->prepare(
        'INSERT INTO users (name, email, phone, password_hash, created_at) VALUES (?, ?, ?, ?, NOW())'
    );
    $stmt->execute([$name, $email, $phone, $passwordHash]);
    $newUserId = (int) $db->lastInsertId();
} catch (PDOException $e) {
    respond(false, 'Registration failed. Please try again. Error: ' . $e->getMessage(), [], 500);
}

// Generate token using helper function
$token = generateToken($newUserId, $email, $name);

respond(true, 'Account created successfully! Welcome to Trivanta.', [
    'token' => $token,
    'user'  => [
        'id'    => $newUserId,
        'name'  => $name,
        'email' => $email,
        'phone' => $phone,
    ],
], 201);
