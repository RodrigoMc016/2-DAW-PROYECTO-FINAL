<?php

// Permitir CORS desde cualquier origen (esto es solo para desarrollo)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS (preflight request), solo respondemos con un status 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Incluir la conexión PDO
require 'conexion.php';  // Asegúrate de que la ruta sea correcta

try {
    // Obtener el email desde el cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email']; // Obtener el email del cuerpo

    if (empty($email)) {
        echo json_encode(['error' => 'Email no proporcionado']);
        exit;
    }

    // Consulta a la base de datos utilizando el email
    $query = "SELECT username, email, creation_date, balance FROM users WHERE email = :email";
    $stmt = $conexionBD->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => 'Usuario no encontrado']);
        exit;
    }

    // Retornar los datos del usuario como JSON
    echo json_encode([
        'username' => $user['username'],
        'email' => $user['email'],
        'creation_date' => $user['creation_date'],
        'balance' => $user['balance']
    ]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}

?>
