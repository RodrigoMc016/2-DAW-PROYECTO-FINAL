<?php
// Conectar a la base de datos
require 'conexion.php';  // Asegúrate de que la ruta sea correcta

// Consulta SQL para obtener la información de los usuarios y sus transacciones
$query = "
    SELECT
        u.id AS user_id,
        u.email,
        COUNT(t.id) AS num_transactions,
        SUM(t.points_used) AS total_points_used,
        SUM(t.euros_used) AS total_euros_used
    FROM
        users u
    LEFT JOIN
        transactions t ON u.email = t.email
    GROUP BY
        u.id
";

$stmt = $conexionBD->prepare($query);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
