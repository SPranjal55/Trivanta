<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode([
    'status' => 'ok',
    'message' => 'PHP backend is reachable',
    'php_version' => phpversion(),
    'time' => date('Y-m-d H:i:s')
]);
