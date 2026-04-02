<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'trivanta_db');
define('DB_USER', 'root');
define('DB_PASS', '');          // XAMPP default is empty password
define('DB_CHARSET', 'utf8mb4');
define('JWT_SECRET', 'trivanta_orange_brand_2025_secret');

function getDB(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_NAME,
        DB_CHARSET
    );

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
        ]);

        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage(),
            'hint'    => 'Check DB_NAME exists in phpMyAdmin and XAMPP MySQL is running',
        ]);
        exit();
    }
}
