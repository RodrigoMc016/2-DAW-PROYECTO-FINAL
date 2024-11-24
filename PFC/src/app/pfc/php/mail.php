<?php
require 'conexion.php'; // Conexión a la base de datos

// Consulta SQL para obtener el feedback
$sql = "
    SELECT
        f.id AS feedback_id,
        f.rating AS rating,
        f.message AS message,
        f.creation_date AS feedback_date,
        u.email AS user_email
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
} catch (PDOException $e) {
  echo "Error al obtener el feedback: " . $e->getMessage();
}

?>
