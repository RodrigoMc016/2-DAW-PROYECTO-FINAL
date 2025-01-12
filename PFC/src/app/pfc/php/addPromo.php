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
$discount = $data['discount'];
$product_id = $data['product_id'] ?? null; // Opcional
$category_name = $data['category_name'] ?? null;

try {
  // Insertar el código promocional con el nombre de la categoría
  $insertQuery = "INSERT INTO promo_codes (code, discount, product_id, category_name)
                    VALUES (:code, :discount, :product_id, :category_name)";
  $stmt = $conexionBD->prepare($insertQuery);
  $stmt->bindParam(':code', $code, PDO::PARAM_STR);
  $stmt->bindParam(':discount', $discount, PDO::PARAM_STR);
  $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
  $stmt->bindParam(':category_name', $category_name, PDO::PARAM_STR);  // Insertar el nombre de la categoría

  $stmt->execute();

  echo json_encode(['success' => true, 'message' => 'Código promocional creado exitosamente.']);
} catch (PDOException $e) {
  echo json_encode(['error' => 'Error al crear el código promocional: ' . $e->getMessage()]);
}
?>
