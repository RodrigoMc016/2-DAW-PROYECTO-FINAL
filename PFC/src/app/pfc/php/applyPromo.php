<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

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
$promoCode = $data['code'];

try {
    // Verificar si el código de promoción es válido
    $sql = "SELECT * FROM promo_codes WHERE code = :code AND is_active = 1";
    $stmt = $conexionBD->prepare($sql);
    $stmt->bindParam(':code', $promoCode);
    $stmt->execute();

    $promo = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$promo) {
        echo json_encode(['error' => 'El código promocional no es válido o ha expirado.']);
        exit;
    }

    // Crear un array para los productos que tienen el descuento aplicado
    $updatedProducts = [];

    // Aplicar descuento a productos o categorías
    if ($promo['product_id']) {
        // Actualizar precio descontado para un producto específico de una categoria 
        $sql = "UPDATE products SET discounted_price = price_real - (price_real * :discount / 100) WHERE id = :product_id";
        $stmt = $conexionBD->prepare($sql);
        $stmt->bindParam(':discount', $promo['discount']);
        $stmt->bindParam(':product_id', $promo['product_id']);
        $stmt->execute();

        // Agregar el producto actualizado a la respuesta
        $sql = "SELECT * FROM products WHERE id = :product_id";
        $stmt = $conexionBD->prepare($sql);
        $stmt->bindParam(':product_id', $promo['product_id']);
        $stmt->execute();
        $updatedProducts[] = $stmt->fetch(PDO::FETCH_ASSOC);

    } elseif ($promo['category_name']) {
        // Actualizar precio ya rebajado para los items de una categoria
        $sql = "UPDATE products p
                JOIN categories c ON p.category_id = c.id
                SET p.discounted_price = p.price_real - (p.price_real * :discount / 100)
                WHERE c.name = :category_name";
        $stmt = $conexionBD->prepare($sql);
        $stmt->bindParam(':discount', $promo['discount']);
        $stmt->bindParam(':category_name', $promo['category_name']);
        $stmt->execute();

        // Obtener los productos actualizados de la categoría
        $sql = "SELECT p.id, p.name, p.price_real, p.discounted_price FROM products p
                JOIN categories c ON p.category_id = c.id
                WHERE c.name = :category_name";
        $stmt = $conexionBD->prepare($sql);
        $stmt->bindParam(':category_name', $promo['category_name']);
        $stmt->execute();
        $updatedProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Responder con los productos actualizados y el descuento aplicado
    echo json_encode([
        'success' => 'Descuento aplicado correctamente.',
        'category_name' => $promo['category_name'],
        'discount' => $promo['discount'],
        'updated_products' => $updatedProducts
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al aplicar el descuento: ' . $e->getMessage()]);
}
?>
