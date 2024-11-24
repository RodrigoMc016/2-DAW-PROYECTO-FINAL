<?php
session_start();
require 'conexion.php'; // Conexión a la base de datos

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");



$inputData = json_decode(file_get_contents('php://input'), true);
$email = $inputData['email'] ?? null;
$password = $inputData['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Email y contraseña son obligatorios.']);
    exit;
}

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conexionBD->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['balance'] = $user['balance'];
    $_SESSION['role_id'] = $user['role_id'];

    // Incluir saldo en la respuesta JSON
    echo json_encode([
        'status' => 'success',
        'message' => 'Login exitoso',
        'is_admin' => ($user['role_id'] === 1),
        'balance' => $user['balance'], // Aquí se incluye el saldo
        'role_id' => $user['role_id']
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas.']);
}
?>
