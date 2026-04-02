<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/helpers.php';

function authenticate(): array {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
        respond(false, 'Authorization token required.', [], 401);
    }

    $token  = substr($authHeader, 7);
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        respond(false, 'Invalid token.', [], 401);
    }

    [$header, $body, $sig] = $parts;
    $expected = base64_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));

    if (!hash_equals($expected, $sig)) {
        respond(false, 'Tampered token.', [], 401);
    }

    $data = json_decode(base64_decode($body), true);

    if (!$data || $data['exp'] < time()) {
        respond(false, 'Token expired.', [], 401);
    }

    return $data;
}
?>

