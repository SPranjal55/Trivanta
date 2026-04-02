<?php
function getRequestBody(): array
{
    // Try JSON body first (React sends JSON)
    $rawInput = file_get_contents('php://input');

    if (!empty($rawInput)) {
        $decoded = json_decode($rawInput, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            return $decoded;
        }
    }

    // Fallback to POST (form submissions)
    if (!empty($_POST)) {
        return $_POST;
    }

    // Fallback to GET (for query params)
    if (!empty($_GET)) {
        return $_GET;
    }

    return [];
}

function sanitize(string $input): string
{
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function respond(bool $success, string $message, array $data = [], int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

function validateEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatePassword(string $password): bool
{
    if (strlen($password) < 8) {
        return false;
    }
    if (!preg_match('/[A-Z]/', $password)) {
        return false;
    }
    if (!preg_match('/[a-z]/', $password)) {
        return false;
    }
    if (!preg_match('/[0-9]/', $password)) {
        return false;
    }
    if (!preg_match('/[!@#$%^&*()\-_=+\[\]{};:\'",.<>?\/\\|`~]/', $password)) {
        return false;
    }

    return true;
}

function generateToken(int $userId, string $email, string $name): string
{
    $secret  = defined('JWT_SECRET') ? JWT_SECRET : 'trivanta_fallback_secret_2025';
    $header  = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'id'    => $userId,
        'email' => $email,
        'name'  => $name,
        'iat'   => time(),
        'exp'   => time() + (7 * 24 * 3600), // 7 days
    ]));
    $signature = base64_encode(
        hash_hmac('sha256', "$header.$payload", $secret, true)
    );

    return "$header.$payload.$signature";
}
