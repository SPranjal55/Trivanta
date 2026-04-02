<?php
// ─── RUN THIS ONCE: http://localhost/trivanta/backend/setup_database.php ───
header('Content-Type: text/html; charset=utf-8');

$host    = 'localhost';
$user    = 'root';
$pass    = '';  // XAMPP default

$results = [];

try {
    // Connect WITHOUT selecting a database first
    $pdo = new PDO(
        "mysql:host=$host;charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $results[] = ['ok', 'Connected to MySQL successfully'];

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS trivanta_db 
                CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $results[] = ['ok', 'Database trivanta_db created/verified'];

    $pdo->exec('USE trivanta_db');

    // Create users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        name          VARCHAR(100)  NOT NULL,
        email         VARCHAR(150)  UNIQUE NOT NULL,
        phone         VARCHAR(20)   DEFAULT NULL,
        password_hash VARCHAR(255)  NOT NULL,
        created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $results[] = ['ok', 'Table: users ✓'];

    // Create password_resets table
    $pdo->exec("CREATE TABLE IF NOT EXISTS password_resets (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        email      VARCHAR(150) NOT NULL,
        token      VARCHAR(255) NOT NULL UNIQUE,
        expires_at DATETIME     NOT NULL,
        created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_token (token),
        INDEX idx_email (email)
    ) ENGINE=InnoDB");
    $results[] = ['ok', 'Table: password_resets ✓'];

    // Create enrollments table
    $pdo->exec("CREATE TABLE IF NOT EXISTS enrollments (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        user_id     INT          NOT NULL,
        course_slug VARCHAR(100) NOT NULL,
        enrolled_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_enrollment (user_id, course_slug),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB");
    $results[] = ['ok', 'Table: enrollments ✓'];

    // Create contacts table
    $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(100),
        email      VARCHAR(150),
        phone      VARCHAR(20),
        subject    VARCHAR(200),
        message    TEXT,
        type       ENUM('contact','newsletter') DEFAULT 'contact',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");
    $results[] = ['ok', 'Table: contacts ✓'];

    // Create quotes table
    $pdo->exec("CREATE TABLE IF NOT EXISTS quotes (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(100),
        email      VARCHAR(150),
        phone      VARCHAR(20),
        company    VARCHAR(150),
        service    VARCHAR(100),
        budget     VARCHAR(50),
        message    TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");
    $results[] = ['ok', 'Table: quotes ✓'];

    $results[] = ['ok', '🎉 ALL DONE! Database and tables are ready. You can now register users.'];
} catch (PDOException $e) {
    $results[] = ['error', 'FAILED: ' . $e->getMessage()];
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Trivanta DB Setup</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 700px; 
           margin: 40px auto; padding: 20px; background: #FFF8F3; }
    h1 { color: #E86A17; }
    .ok    { color: #16a34a; background: #f0fdf4; 
             border: 1px solid #bbf7d0; padding: 10px 16px; 
             border-radius: 8px; margin: 6px 0; }
    .error { color: #dc2626; background: #fef2f2; 
             border: 1px solid #fecaca; padding: 10px 16px; 
             border-radius: 8px; margin: 6px 0; }
    .note  { background: #fff7ed; border: 1px solid #fed7aa; 
             padding: 16px; border-radius: 8px; margin-top: 24px; 
             color: #9a3412; }
  </style>
</head>
<body>
  <h1>🍊 Trivanta Database Setup</h1>
  <?php foreach ($results as [$type, $msg]): ?>
    <div class="<?= $type ?>"><?= htmlspecialchars($msg) ?></div>
  <?php endforeach; ?>
  <div class="note">
    <strong>Next steps:</strong><br>
    1. Delete or rename this file after setup (security)<br>
    2. Go to your React app and try registering a new account<br>
    3. Test login at <a href="http://localhost:3000/login">http://localhost:3000/login</a>
  </div>
</body>
</html>
