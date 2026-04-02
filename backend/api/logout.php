<?php
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');

require_once __DIR__ . '/../includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(false, 'Method not allowed', [], 405);
}

// JWT is stateless; we cannot invalidate it server-side without a blacklist.
respond(true, 'Logged out successfully', [], 200);

