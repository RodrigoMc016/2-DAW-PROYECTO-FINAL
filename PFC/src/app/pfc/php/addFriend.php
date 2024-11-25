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
$newFriendUsername = $data['newFriendUsername']; // El nombre de usuario del nuevo amigo

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

    // Obtener el id del nuevo amigo usando su nombre de usuario
    $friendQuery = "SELECT id FROM users WHERE username = :username";
    $friendStmt = $conexionBD->prepare($friendQuery);
    $friendStmt->bindParam(':username', $newFriendUsername, PDO::PARAM_STR);
    $friendStmt->execute();
    $friend = $friendStmt->fetch(PDO::FETCH_ASSOC);

    if (!$friend) {
        echo json_encode(['error' => 'Amigo no encontrado']);
        exit;
    }

    $friend_id = $friend['id'];

    // Insertar la relación de amistad
    $insertQuery = "INSERT INTO user_friends (user_id, friend_id) VALUES (:user_id, :friend_id)";
    $insertStmt = $conexionBD->prepare($insertQuery);
    $insertStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $insertStmt->bindParam(':friend_id', $friend_id, PDO::PARAM_INT);
    $insertStmt->execute();

    echo json_encode(['success' => true, 'friend_username' => $newFriendUsername]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
