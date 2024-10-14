<?php
require 'conexion.php'; // Conexión a la base de datos
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Email y contraseña son obligatorios.']);
    exit;
}

// Consulta para obtener el usuario
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Autenticación exitosa
    $isAdmin = ($email === 'admin@timelessflavour.com'); // Verifica si el usuario es admin

    echo json_encode([
        'status' => 'success',
        'message' => 'Inicio de sesión exitoso.',
        'is_admin' => $isAdmin // Devuelve si es admin
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas.']);
}
?>
