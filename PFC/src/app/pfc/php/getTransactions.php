<?php

// Configuración de CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Si es una solicitud OPTIONS (preflight request), solo respondemos con un status 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

// Conexión a la base de datos
require 'conexion.php';

// Obtener el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(['error' => 'El email es requerido']);
    exit;
}

// Obtener el email del cuerpo de la solicitud
$email = $data['email'];

try {
    // Consulta para obtener las transacciones del usuario
    $query = "SELECT id, transaction_type, euros_used, points_used, transaction_date, description, address
              FROM transactions WHERE email = :email ORDER BY transaction_date DESC";
    $stmt = $conexionBD->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Verificar si hay resultados
    if (!$transactions) {
        echo json_encode(['message' => 'No se encontraron transacciones para este usuario']);
        exit;
    }

    // Responder con las transacciones
    echo json_encode($transactions);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
