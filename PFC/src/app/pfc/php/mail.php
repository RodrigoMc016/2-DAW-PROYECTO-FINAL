<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require 'conexion.php'; // Conexión a la base de datos

// Consulta SQL para obtener el feedback
$sql = "
    SELECT
        u.email AS user_email,
        f.id AS feedback_id,
        f.rating AS rating,
        f.message AS message,
        f.creation_date AS feedback_date

    FROM feedback f
    JOIN users u ON f.user_id = u.id
    ORDER BY f.creation_date DESC
";

try {
  // Prepara y ejecuta la consulta
  $stmt = $conexionBD->prepare($sql);
  $stmt->execute();

  // Obtiene todos los resultados
  $feedbacks = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Devolver los datos en formato JSON
  echo json_encode($feedbacks);

} catch (PDOException $e) {
  echo json_encode(["error" => "Error al obtener el feedback: " . $e->getMessage()]);
}
