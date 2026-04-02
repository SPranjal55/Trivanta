<?php
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = sanitize($_GET['token'] ?? '');
    if (empty($token)) {
        respond(false, 'Token is required.', [], 400);
    }

    $db   = getDB();
    $stmt = $db->prepare(
        'SELECT email FROM password_resets WHERE token = ? AND expires_at > NOW() LIMIT 1'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch();

    if (!$row) {
        respond(false, 'This reset link is invalid or has expired.', [], 400);
    }

    respond(true, 'Token is valid.', ['email' => $row['email']]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body     = getRequestBody();
    $token    = sanitize($body['token'] ?? '');
    $password = $body['password'] ?? '';
    $confirm  = $body['confirm_password'] ?? '';

    if (empty($token) || empty($password) || empty($confirm)) {
        respond(false, 'All fields are required.', [], 400);
    }

    if ($password !== $confirm) {
        respond(false, 'Passwords do not match.', [], 400);
    }

    if (!validatePassword($password)) {
        respond(false, 'Password does not meet strength requirements.', [], 400);
    }

    $db   = getDB();
    $stmt = $db->prepare(
        'SELECT email FROM password_resets WHERE token = ? AND expires_at > NOW() LIMIT 1'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch();

    if (!$row) {
        respond(false, 'This reset link is invalid or has expired.', [], 400);
    }

    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    $db->prepare('UPDATE users SET password_hash = ? WHERE email = ?')
       ->execute([$hash, $row['email']]);

    $db->prepare('DELETE FROM password_resets WHERE token = ?')
       ->execute([$token]);

    respond(true, 'Password updated successfully. You can now log in.');
}

respond(false, 'Method not allowed.', [], 405);
?>
