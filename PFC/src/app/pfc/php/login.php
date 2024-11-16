<?php
require 'conexion.php'; // Conexión a la base de datos

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Encabezados para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");



$inputData = json_decode(file_get_contents('php://input'), true); //convierte de un json a un array php asociativo
$email = $inputData['email'] ?? null;
$password = $inputData['password'] ?? null;


//Validación de todos los campos required
if (!$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Email y contraseña son obligatorios.']);
    exit;
}

// Consulta para obtener el usuario
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conexionBD->prepare($sql);  //uso la variable global conexionDB de conexion php en vez de pdo
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC); //array asociativo que da verdadero si hay datos o falso si no, smt es una consulta preparada para mayor seguridad

if ($user && password_verify($password, $user['password'])) {

    $isAdmin = ($user['role_id'] === 1); // Verifica si el usuario es admin dependiendo del role_id (1 para admins, 2 para usuarios)

    echo json_encode([
        'is_admin' => $isAdmin // Devuelve si es admin
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas.']);
}
?>
