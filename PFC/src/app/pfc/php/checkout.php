<?php


// Configuración de cabeceras para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once('C:/xampp/htdocs/stripe-php-master/init.php');

// Tu clave secreta de Stripe (obténla desde el Dashboard de Stripe)
\Stripe\Stripe::setApiKey('sk_test_51QO2bhLLsR8hkmPmFGnqAshKi1ti19gh4IgrsN3WKLnhQVkOzOA67FM6jBx7AsWVKanWSQZKbvABUNb17jqKNtNR00IpHpEqUC'); // Reemplaza con tu clave secreta

// Recupera los datos del carrito y total desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$cartItems = $data['cartItems']; // Detalles del carrito
$totalPrice = $data['totalPrice']; // Total del precio

// Crea una sesión de pago con Stripe Checkout
try {
    // Crear una sesión de pago en Stripe Checkout
    $checkoutSession = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'], // Método de pago: tarjeta
        'line_items' => array_map(function($item) {
            return [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['product']['name'],
                    ],
                    'unit_amount' => $item['product']['price_real'] * 100, // El precio debe estar en centavos
                ],
                'quantity' => $item['ammount'],
            ];
        }, $cartItems),
        'mode' => 'payment', // Modo de pago: 'payment' o 'subscription'
        'success_url' => 'http://localhost/success.html', // URL de éxito
        'cancel_url' => 'http://localhost/cancel.html', // URL de cancelación
    ]);

    // Devuelve la sesión de pago (session_id) como respuesta JSON
    echo json_encode(['id' => $checkoutSession->id]);

} catch (\Stripe\Exception\ApiErrorException $e) {
    // Si ocurre un error, lo mostramos
    echo json_encode(['error' => $e->getMessage()]);
}
?>
