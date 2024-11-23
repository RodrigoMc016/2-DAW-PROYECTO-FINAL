<?php

// Configuración de cabeceras para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once('C:/xampp/htdocs/stripe-php-master/init.php');


// Configura la clave secreta de Stripe
\Stripe\Stripe::setApiKey('sk_test_51QO2bhLLsR8hkmPmFGnqAshKi1ti19gh4IgrsN3WKLnhQVkOzOA67FM6jBx7AsWVKanWSQZKbvABUNb17jqKNtNR00IpHpEqUC');

// Obtener el session_id del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$sessionId = $data['sessionId'];

try {
    // Recuperar la sesión de pago de Stripe
    $session = \Stripe\Checkout\Session::retrieve($sessionId);

    if ($session->payment_status == 'paid') {
        // El pago fue exitoso
        echo json_encode(['success' => true]);
    } else {
        // El pago no fue exitoso
        echo json_encode(['success' => false, 'message' => 'El pago no fue completado']);
    }
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(['success' => false, 'message' => 'Error al verificar el pago: ' . $e->getMessage()]);
}
?>
