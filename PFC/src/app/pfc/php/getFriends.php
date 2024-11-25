<?php


require 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS (preflight request), solo respondemos con un status 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}






try {
  $data = json_decode(file_get_contents("php://input"), true);

  $email = $data['email']; // Email del usuario logueado
  // Obtener el user_id del email
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

  // Obtener los amigos del usuario
  $query = "
        SELECT u.id, u.username, u.email
        FROM user_friends uf
        JOIN users u ON uf.friend_id = u.id
        WHERE uf.user_id = :user_id
        UNION
        SELECT u.id, u.username, u.email
        FROM user_friends uf
        JOIN users u ON uf.user_id = u.id
        WHERE uf.friend_id = :user_id
    ";
  $stmt = $conexionBD->prepare($query);
  $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
  $stmt->execute();
  $friends = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($friends);

} catch (PDOException $e) {
  echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
