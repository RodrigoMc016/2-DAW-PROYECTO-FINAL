<?php
require "conexion.php";

// Configuración de cabeceras para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$datos = json_decode(file_get_contents("php://input"), true);

// Verifica que se han recibido todos los datos necesarios
if (isset($datos["email"]) && isset($datos["rating"]) && isset($datos["comments"])) {
    $email = $datos["email"];
    $rating = (int)$datos["rating"];
    $comments = $datos["comments"];

    try {
        // Obtener el user_id asociado al email
        $userStmt = $conexionBD->prepare("SELECT id FROM users WHERE email = :email");
        $userStmt->bindParam(':email', $email);
        $userStmt->execute();
        $userId = $userStmt->fetchColumn(); // Obtiene el valor de la primera columna de la siguiente fila del conjunto de resultados

        // Verificar que se haya encontrado un user_id
        if ($userId) {
            // Consulta SQL para insertar los valores en la tabla feedback
            $sql = "INSERT INTO feedback (user_id, email, rating, message) VALUES (:user_id, :email, :rating, :message)";

            // Preparar y ejecutar la consulta
            $stmt = $conexionBD->prepare($sql);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);
            $stmt->bindParam(':message', $comments);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Feedback guardado "]);
            } else {
                echo json_encode(["message" => "Error"]);
            }
        } else {
            echo json_encode(["message" => "No se encontró un usuario con el email proporcionado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error sql", "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Faltan datos"]);
}

$conexionBD = null; //Cerrado de conexión
?>
