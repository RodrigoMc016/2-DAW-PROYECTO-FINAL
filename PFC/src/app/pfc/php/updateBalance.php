<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Agrega Authorization si es necesario
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// // Si es una solicitud OPTIONS, retorna 200 sin procesar más
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }
require_once 'conexion.php';
require_once 'C:/xampp/htdocs/stripe-php-master/init.php';

\Stripe\Stripe::setApiKey('sk_test_51QO2bhLLsR8hkmPmFGnqAshKi1ti19gh4IgrsN3WKLnhQVkOzOA67FM6jBx7AsWVKanWSQZKbvABUNb17jqKNtNR00IpHpEqUC'); // Clave secreta de Stripe



// Obtener el email y los puntos ganados desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$pointsEarned = $data['pointsEarned'];

try {
    // Actualizar el saldo del usuario en la base de datos
    $query = "UPDATE users SET balance = balance + :pointsEarned WHERE email = :email";
    $stmt = $conexionBD->prepare($query);
    $stmt->bindParam(':pointsEarned', $pointsEarned);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el saldo: ' . $e->getMessage()]);
}
?>

