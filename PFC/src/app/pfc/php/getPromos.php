<?php

// Configuración para mostrar errores (útil para desarrollo)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de cabeceras para permitir peticiones desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Manejo de preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Incluir conexión a la base de datos
require 'conexion.php';

try {
    // Consulta para obtener todos los datos de la tabla promo_codes
    $sql = "SELECT id, code, discount, product_id, category_name, is_active, creation_date FROM promo_codes";
    $stmt = $conexionBD->prepare($sql); // Preparar la consulta

    $stmt->execute(); // Ejecutar la consulta
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los resultados como un array asociativo

    // Enviar los resultados como JSON
    echo json_encode($result);

} catch (PDOException $e) {
    // Enviar un mensaje de error en caso de fallo
    echo json_encode(['error' => "Error al obtener los códigos promocionales: " . $e->getMessage()]);
}
?>
