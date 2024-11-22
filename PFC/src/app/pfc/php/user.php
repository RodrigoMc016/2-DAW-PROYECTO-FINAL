<?php
// Incluye la configuración de la conexión a la base de datos
require_once 'conexion.php';


session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "No autenticado"]);
    exit();
}

$userId = $_SESSION['user_id']; // Obtener el ID del usuario desde la sesión

try {
    // Consulta para obtener el perfil del usuario
    $query = "SELECT username, email, balance FROM users WHERE id = :id";
    $stmt = $conexionBD->prepare($query);
    $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
    $stmt->execute();

    // Verificar si se encontraron resultados
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($user);
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}
?>
