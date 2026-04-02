<?php
require_once __DIR__ . '/config/cors.php';
header('Content-Type: application/json');
require_once __DIR__ . '/includes/helpers.php';

respond(false, 'Trivanta backend: endpoint not found', [], 404);

