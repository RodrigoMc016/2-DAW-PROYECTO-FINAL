<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS ");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS (preflight request), solo respondemos con un status 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once('C:/xampp/htdocs/stripe-php-master/init.php');

// Tu clave secreta de Stripe (obténla desde el Dashboard de Stripe)
\Stripe\Stripe::setApiKey('sk_test_51QO2bhLLsR8hkmPmFGnqAshKi1ti19gh4IgrsN3WKLnhQVkOzOA67FM6jBx7AsWVKanWSQZKbvABUNb17jqKNtNR00IpHpEqUC'); // Reemplaza con tu clave secreta

// Recupera los datos del carrito y total desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
error_log(print_r($data, true));

// Verificar si la dirección está presente
$cartItems = $data['cartItems']; // Detalles del carrito
$totalPrice = $data['totalPrice']; // Total del precio
$address = $data['address'] ?? '';

if (empty($address)) {
  echo json_encode(['error' => 'La dirección es obligatoria']);
  exit;
}

// Crea una sesión de pago con Stripe Checkout
try {
  // Crear una sesión de pago en Stripe Checkout
  $checkoutSession = \Stripe\Checkout\Session::create([
    'payment_method_types' => ['card'], // Método de pago: tarjeta
    'line_items' => array_map(function ($item) {
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
    'success_url' => 'http://localhost:4200/pago-realizado', // URL de éxito
    'cancel_url' => 'http://localhost:4200/TimelessFlavour/home', // URL de cancelación
    'shipping_address_collection' => [
      'allowed_countries' => ['ES'], // Países permitidos (por ejemplo, solo España)
    ],
    'metadata' => [
      'direccion' => $address // Agrega la dirección a los metadatos
    ]
  ]);
  // Comprobar si la sesión se creó correctamente
  if ($checkoutSession) {
    echo json_encode(['id' => $checkoutSession->id]); // Esta línea debería devolver el session_id
  } else {
    echo json_encode(['error' => 'No se pudo crear la sesión de pago']);
  }


} catch (\Stripe\Exception\ApiErrorException $e) {
  // Si ocurre un error, lo mostramos
  echo json_encode(['error' => $e->getMessage()]);

}
?>
