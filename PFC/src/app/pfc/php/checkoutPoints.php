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

// Incluir la conexión PDO (asegúrate de tener el archivo correcto)
require 'conexion.php';  // Asegúrate de que la ruta sea correcta

// Recuperar los datos enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);


// Verificar que el correo esté presente
$email = $data['email'];  // El email del usuario


// Continuar con la lógica de procesamiento si el correo es válido
$cartItems = $data['cartItems'] ?? null;
$totalPoints = $data['totalPoints'] ?? null;
$address = $data['address'] ?? null;

// Validación de otros campos (por ejemplo, cartItems, totalPoints, address)
$errors = [];
if (!$cartItems || !is_array($cartItems) || empty($cartItems)) {
    $errors[] = 'Faltan productos en el carrito';
}
if ($totalPoints === null || $totalPoints <= 0) {
    $errors[] = 'El total de puntos es inválido';
}
if (!$address) {
    $errors[] = 'Falta la dirección';
}

if (!empty($errors)) {
    echo json_encode(['error' => implode(', ', $errors)]);
    exit;
}

// Procesar la transacción si los datos son correctos
try {
    // Registrar la transacción en la tabla 'transactions'
    $transactionQuery = "INSERT INTO transactions (email, points_used, address)
                         VALUES (:email, :pointsUsed, :address)";
    $transactionStmt = $conexionBD->prepare($transactionQuery);
    $transactionStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $transactionStmt->bindParam(':pointsUsed', $totalPoints, PDO::PARAM_INT);
    $transactionStmt->bindParam(':address', $address, PDO::PARAM_STR);
    $transactionStmt->execute();

    // Respuesta de éxito
    echo json_encode(['success' => true, 'message' => 'Compra realizada exitosamente.']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}


