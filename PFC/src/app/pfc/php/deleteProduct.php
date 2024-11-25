<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, UPDATE");
header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

require 'conexion.php';

// Obtener el id del producto a eliminar
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si el id está presente
if (isset($data['id'])) {
  $productId = $data['id'];

  // Preparar la consulta SQL para eliminar el producto
  $query = "DELETE FROM products WHERE id = :id";
  $stmt = $conexionBD->prepare(query: $query);

  // Ejecutar la consulta
  try {
    $stmt->execute([ ':id' => $productId ]);
    echo json_encode(['message' => 'Producto eliminado correctamente']);
  } catch (PDOException $e) {
    echo json_encode(['error' => 'Error al eliminar el producto: ' . $e->getMessage()]);
  }
} else {
  echo json_encode(['error' => 'ID del producto no proporcionado']);
}

