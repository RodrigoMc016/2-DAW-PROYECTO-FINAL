<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Incluir el archivo de conexión a la base de datos
require 'conexion.php'; // Asegúrate de tener este archivo de conexión configurado

// Comprobar si la solicitud es un GET
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        // Consulta SQL para obtener los usuarios con rol_id = 2 (usuarios)
        $query = "
            SELECT
                users.id,
                users.username,
                users.email,
                users.creation_date,
                users.balance
            FROM
                users
            JOIN
                roles ON users.role_id = roles.id
            WHERE
                users.role_id = 2  -- Filtra solo los usuarios con role_id = 2
            ORDER BY
                users.creation_date DESC;
        ";

        // Ejecutar la consulta
        $stmt = $conexionBD->prepare($query);
        $stmt->execute();

        // Obtener los resultados
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Verificar si hay resultados
        if (count($users) > 0) {
            echo json_encode($users); // Devuelve los resultados como JSON
        } else {
            echo json_encode(["message" => "No se encontraron usuarios."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al consultar la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Método no permitido."]);
}
?>
