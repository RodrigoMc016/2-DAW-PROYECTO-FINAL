<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    $senderEmail = $input["senderEmail"] ?? null;
    $receiverEmail = $input["receiverEmail"] ?? null;
    $points = $input["points"] ?? null;

    if (!$senderEmail || !$receiverEmail || !$points || $points <= 0) {
        echo json_encode(["error" => "Datos inválidos. Asegúrate de proporcionar todos los campos."]);
        exit();
    }

    try {
        $conexionBD->beginTransaction();

        // Obtener información del remitente
        $stmt = $conexionBD->prepare("SELECT id, username, balance FROM users WHERE email = :email");
        $stmt->execute(["email" => $senderEmail]);
        $sender = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si el remitente tiene suficiente saldo
        if ($sender['balance'] < $points) {
            echo json_encode(["error" => "Saldo insuficiente para realizar la transferencia."]);
            exit(); // Salir si el saldo es insuficiente
        }

        // Obtener información del destinatario
        $stmt = $conexionBD->prepare("SELECT id, username FROM users WHERE email = :email");
        $stmt->execute(["email" => $receiverEmail]);
        $receiver = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$receiver) {
            throw new Exception("El destinatario no existe.");
        }

        // Actualizar el saldo del remitente
        $stmt = $conexionBD->prepare("UPDATE users SET balance = balance - :points WHERE id = :id");
        $stmt->execute([
            "points" => $points,
            "id" => $sender["id"]
        ]);

        // Actualizar el saldo del destinatario
        $stmt = $conexionBD->prepare("UPDATE users SET balance = balance + :points WHERE id = :id");
        $stmt->execute([
            "points" => $points,
            "id" => $receiver["id"]
        ]);

        // Registrar la transacción para el remitente
        $stmt = $conexionBD->prepare("
            INSERT INTO transactions (email, transaction_type, points_used, description, address)
            VALUES (:email, 'Transferencia de puntos', :points, 'Transferencia de puntos enviada', 'N/A')
        ");
        $stmt->execute([
            "email" => $senderEmail,
            "points" => -$points // Negativo para indicar salida de puntos
        ]);

        // Registrar la transacción para el destinatario
        $description = "Puntos recibidos de " . $sender["username"];
        $stmt = $conexionBD->prepare("
            INSERT INTO transactions (email, transaction_type, points_used, description, address)
            VALUES (:email, 'Puntos recibidos', :points, :description, 'N/A')
        ");
        $stmt->execute([
            "email" => $receiverEmail,
            "points" => $points, // Positivo para indicar entrada de puntos
            "description" => $description
        ]);

        $conexionBD->commit();

        echo json_encode(["success" => "Transferencia realizada exitosamente."]);
    } catch (Exception $e) {
        $conexionBD->rollBack();
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Método no permitido."]);
}
