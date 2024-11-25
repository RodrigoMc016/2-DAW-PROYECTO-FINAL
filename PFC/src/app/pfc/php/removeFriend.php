<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS (preflight request), solo respondemos con un status 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email']; // El email del usuario logueado
$friendId = $data['friendId']; // El id del amigo a eliminar

try {
    // Obtener el user_id del email del usuario logueado
    $userQuery = "SELECT id FROM users WHERE email = :email";
    $userStmt = $conexionBD->prepare($userQuery);
    $userStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $userStmt->execute();
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => 'Usuario no encontrado']);
        exit;
    }

    $user_id = $user['id'];

    // Eliminar la relación de amistad
    $deleteQuery = "
        DELETE FROM user_friends
        WHERE (user_id = :user_id AND friend_id = :friend_id)
           OR (user_id = :friend_id AND friend_id = :user_id)";
    $deleteStmt = $conexionBD->prepare($deleteQuery);
    $deleteStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $deleteStmt->bindParam(':friend_id', $friendId, PDO::PARAM_INT);
    $deleteStmt->execute();

    if ($deleteStmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'No se encontró la relación de amistad.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
