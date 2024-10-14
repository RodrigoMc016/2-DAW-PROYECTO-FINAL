<?php

require 'conexion.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$username = $_POST['username'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;


if (!$username || !$email || !$password ) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

// Comprueba si el usuario o email ya existen
$sql = "SELECT * FROM users WHERE username = ? OR email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$username, $email]);
$userExists = $stmt->fetch();

if ($userExists) {
    echo json_encode(['status' => 'error', 'message' => 'El nombre de usuario o email ya están en uso.']);
    exit;
}

// Inserta el nuevo usuario
$hashedPassword = password_hash($password, PASSWORD_BCRYPT); // Encripta la contraseña
$sql = "INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$username, $email, $hashedPassword, 2]); // 2 para usuario normal

echo json_encode(['status' => 'success', 'message' => 'Registro exitoso.']);
?>
