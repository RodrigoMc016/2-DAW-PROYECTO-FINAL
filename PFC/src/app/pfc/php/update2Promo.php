<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$code = $data['code'];

try {
    $updateQuery = "UPDATE promo_codes SET is_active = 1 WHERE code = :code";
    $stmt = $conexionBD->prepare($updateQuery);
    $stmt->bindParam(':code', $code, PDO::PARAM_STR);

    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Código promocional reactivado exitosamente.']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al reactivar el código promocional: ' . $e->getMessage()]);
}
?>
