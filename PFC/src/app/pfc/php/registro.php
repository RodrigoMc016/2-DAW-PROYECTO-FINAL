<?php
// Mostrar errores
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require 'conexion.php'; 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

//Convertir el Json recibido en array asociativo
$inputData = json_decode(file_get_contents('php://input'), true);

// Validar que los datos fueron enviados correctamente
$username = $inputData['username'] ?? null;
$email = $inputData['email'] ?? null;
$password = $inputData['password'] ?? null;

if (!$username || !$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

// Comprobar si la conexión a la base de datos está correcta
if (!$conexionBD) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos']);
    exit;
}

// Comprueba si el usuario o email ya existen
$sql = "SELECT * FROM users WHERE username = ? OR email = ?";
$stmt = $conexionBD->prepare($sql);
$stmt->execute([$username, $email]);
$userExists = $stmt->fetch();


// Si el usuario existe manda un mensaje
if ($userExists) {
    echo json_encode(['status' => 'error', 'message' => 'El nombre de usuario o email ya están en uso.']);
    exit;
}

// Inserta el nuevo usuario
$hashedPassword = password_hash($password, PASSWORD_BCRYPT); // Encriptacion de la contraseña

// Asigna role_id basado en el correo electrónico
$adminEmail = "adminTF@gmail.com";

if ($email === $adminEmail) {
    $roleId = 1; // Asigna 1 si el correo es el del administrador
} else {
    $roleId = 2; // Asigna 2 para usuarios normales
}

// Inserta el nuevo usuario en la base de datos
$sql = "INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)";
$stmt = $conexionBD->prepare($sql);

try {
    $stmt->execute([$username, $email, $hashedPassword, $roleId]);
    echo json_encode(['status' => 'success', 'message' => 'Registro exitoso.']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al registrar el usuario: ' . $e->getMessage()]);
}
?>
