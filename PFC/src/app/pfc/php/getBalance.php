<?php

require 'conexion.php';
// Configuración de cabeceras para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS (preflight), responder con un código 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}



// Leer los datos de la solicitud en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si el email ha sido proporcionado
if (isset($data['email']) && !empty($data['email'])) {
    $email = $data['email'];


        try {
            // Consultar el saldo actual del usuario
            $sql = "SELECT balance FROM users WHERE email = :email";
            $stmt = $conexionBD->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verificar si el usuario fue encontrado
            if ($result) {
                // Si el usuario existe, devolver el saldo
                echo json_encode(['success' => true, 'saldo' => $result['balance']]);
            } else {
                // Si el usuario no existe en la base de datos
                echo json_encode(['error' => 'Usuario no encontrado']);
            }
        } catch (PDOException $e) {
            // Manejo de errores si la consulta falla
            echo json_encode(['error' => 'Error al consultar el saldo: ' . $e->getMessage()]);
        }
    } else {
        // Si no se pudo establecer la conexión con la base de datos
        echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
    }

// Cerrar la conexión (opcional)
$pdo = null;
?>
