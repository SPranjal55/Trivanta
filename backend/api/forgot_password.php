<?php
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed', [], 405);
}

$body  = getRequestBody();
$email = sanitize($body['email'] ?? '');

if (empty($email) || !validateEmail($email)) {
    respond(false, 'Valid email is required.', [], 400);
}

$db   = getDB();
$stmt = $db->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

// Always respond the same way for security (don't reveal if email exists)
if ($user) {
    $token   = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', time() + 3600); // 1 hour

    // Remove old tokens for this email
    $db->prepare('DELETE FROM password_resets WHERE email = ?')->execute([$email]);

    // Insert new token
    $db->prepare(
        'INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)'
    )->execute([$email, $token, $expires]);

    // In production: send email with PHPMailer
    // For now, log to a file for testing
    $resetLink = "http://localhost:3000/reset-password?token=$token";
    file_put_contents(__DIR__ . '/../logs/reset_links.log', 
        date('Y-m-d H:i:s') . " | $email | $resetLink\n", FILE_APPEND);
}

respond(true, "If this email is registered, you'll receive a reset link shortly.");
?>
