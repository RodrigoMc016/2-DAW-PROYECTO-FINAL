<?php
require 'conexion.php';

// Obtener todos los productos y sus categorías
$sql = "
    SELECT DISTINCT
        c.name as category_name,
        p.id as product_id,
        p.name as product_name,
        p.description,
        p.price_real,
        p.price_points,
        p.image_url
    FROM products as p
    JOIN categories as c ON p.category_id = c.id
    ORDER BY p.id
";

try {
    // Prepara y ejecuta la consulta
    $stmt = $conexionBD->prepare($sql);
    $stmt->execute();

    // Obtiene todos los resultados
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error al obtener los productos: " . $e->getMessage();
}

// Función para manejar la eliminación de productos
if (isset($_POST['delete_product'])) {
    $productId = $_POST['product_id'];

    $deleteSql = "DELETE FROM products WHERE id = :product_id";
    $deleteStmt = $conexionBD->prepare($deleteSql);
    $deleteStmt->bindParam(':product_id', $productId, PDO::PARAM_INT);
    if ($deleteStmt->execute()) {
        echo "Producto eliminado con éxito.";
        header("Location: admin_products.php"); // Redirigir a la misma página
    } else {
        echo "Error al eliminar el producto.";
    }
}

// Función para manejar la actualización de productos
if (isset($_POST['update_product'])) {
    $productId = $_POST['product_id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $priceReal = $_POST['price_real'];
    $pricePoints = $_POST['price_points'];
    $categoryId = $_POST['category_id'];

    $updateSql = "
        UPDATE products
        SET name = :name, description = :description, price_real = :price_real, price_points = :price_points, category_id = :category_id
        WHERE id = :product_id
    ";
    $updateStmt = $conexionBD->prepare($updateSql);
    $updateStmt->bindParam(':product_id', $productId, PDO::PARAM_INT);
    $updateStmt->bindParam(':name', $name);
    $updateStmt->bindParam(':description', $description);
    $updateStmt->bindParam(':price_real', $priceReal);
    $updateStmt->bindParam(':price_points', $pricePoints);
    $updateStmt->bindParam(':category_id', $categoryId);

    if ($updateStmt->execute()) {
        echo "Producto actualizado con éxito.";
        header("Location: admin_products.php"); // Redirigir a la misma página
    } else {
        echo "Error al actualizar el producto.";
    }
}

// Función para manejar la creación de productos
if (isset($_POST['add_product'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $priceReal = $_POST['price_real'];
    $pricePoints = $_POST['price_points'];
    $categoryId = $_POST['category_id'];
    $imageUrl = $_POST['image_url'];

    $insertSql = "
        INSERT INTO products (name, description, price_real, price_points, category_id, image_url)
        VALUES (:name, :description, :price_real, :price_points, :category_id, :image_url)
    ";
    $insertStmt = $conexionBD->prepare($insertSql);
    $insertStmt->bindParam(':name', $name);
    $insertStmt->bindParam(':description', $description);
    $insertStmt->bindParam(':price_real', $priceReal);
    $insertStmt->bindParam(':price_points', $pricePoints);
    $insertStmt->bindParam(':category_id', $categoryId);
    $insertStmt->bindParam(':image_url', $imageUrl);

    if ($insertStmt->execute()) {
        echo "Producto añadido con éxito.";
        header("Location: admin_products.php"); // Redirigir a la misma página
    } else {
        echo "Error al añadir el producto.";
    }
}

?>
