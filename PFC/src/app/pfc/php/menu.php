<?php
require 'conexion.php';

// Encabezados para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// SELECT PARA SACAR TODOS LOS DATOS RELACIONANDO LAS TABLAS DE CATEGORÍAS Y PRODUCTOS Y ORDENANDO POR NOMBRES
$sql = "
    SELECT
        c.name as category_name,
        p.id as product_id,
        p.name as product_name,
        p.description,
        p.price_real,
        p.price_points,
        p.image_url
    FROM products as p
    JOIN categories as c ON p.category_id = c.id
    ORDER BY c.name, p.name
";

try {
    // Prepara y ejecuta la consulta
    $stmt = $conexionBD->prepare($sql);
    $stmt->execute();

    // Obtiene todos los resultados
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Crear array vacío para organizar los datos por categoría
    $data = [];

    foreach ($rows as $row) {
        $category = $row['category_name'];

        // Si la categoría no existe en el arreglo, se inicializa
        if (!isset($data[$category])) {
            $data[$category] = [];
        }

        // Agregar producto a la categoría correspondiente
        $data[$category][] = [
            'id' => (int)$row['product_id'],
            'name' => $row['product_name'],
            'description' => $row['description'],
            'price_real' => (float)$row['price_real'],
            'price_points' => (int)$row['price_points'],
            'image_url' => $row['image_url']
        ];
    }

    // Devuelve los datos en formato JSON
    echo json_encode($data);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

// Cierra la conexión
$conexionBD = null;


?>
