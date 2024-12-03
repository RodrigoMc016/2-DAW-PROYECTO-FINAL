<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

// Verificar si todos los campos necesarios están presentes
if (
    isset($data['id']) &&
    isset($data['name']) &&
    isset($data['price_real']) &&
    isset($data['price_points']) &&
    isset($data['category_id']) &&
    isset($data['description'])
) {
    $id = $data['id'];
    $name = $data['name'];
    $price_real = $data['price_real'];
    $price_points = $data['price_points'];
    $category_id = $data['category_id'];
    $description = $data['description'];
    $image_url = isset($data['image_url']) ? $data['image_url'] : null; // La imagen es opcional

    // Preparar la consulta SQL para actualizar el producto
    $query = "UPDATE products
              SET name = :name,
                  price_real = :price_real,
                  price_points = :price_points,
                  category_id = :category_id,
                  description = :description,
                  image_url = :image_url
              WHERE id = :id";
    $stmt = $conexionBD->prepare($query);

    // Ejecutar la consulta
    try {
        $stmt->execute([
            ':id' => $id,
            ':name' => $name,
            ':price_real' => $price_real,
            ':price_points' => $price_points,
            ':category_id' => $category_id,
            ':description' => $description,
            ':image_url' => $image_url
        ]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Producto actualizado correctamente']);
        } else {
            echo json_encode(['error' => 'No se encontró un producto con el ID proporcionado o no hubo cambios']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al actualizar el producto: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan datos para actualizar el producto']);
}
?>
