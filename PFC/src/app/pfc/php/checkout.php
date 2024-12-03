<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT ");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

require 'conexion.php';
$path = __DIR__ . '/../stripe-php-master/init.php';
if (file_exists($path)) {
    require_once($path);
} else {
    die('El archivo init.php no se encuentra en: ' . $path);
}

// Tu clave secreta de Stripe (obténla desde el Dashboard de Stripe)
\Stripe\Stripe::setApiKey('sk_test_51QO2bhLLsR8hkmPmFGnqAshKi1ti19gh4IgrsN3WKLnhQVkOzOA67FM6jBx7AsWVKanWSQZKbvABUNb17jqKNtNR00IpHpEqUC'); // Reemplaza con tu clave secreta

// Recupera los datos del carrito y total desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
error_log(print_r($data, true));

// Verificar si la dirección está presente
$email = $data['email'];// Email no nulo
$cartItems = $data['cartItems']; // Detalles del carrito
$totalPrice = $data['totalPrice']; // Total del precio
$address = $data['address'] ?? '';//Dirección

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
    'success_url' => 'http://proyectotf.atwebpages.com/pago-realizado', // URL de éxito
    'cancel_url' => 'http://proyectotf.atwebpages.com/pago-realizado', // URL de cancelación
    'shipping_address_collection' => [
      'allowed_countries' => ['ES'], // Países permitidos (por ejemplo, solo España)
    ],
    'metadata' => [
      'direccion' => $address, // Agrega la dirección a los metadatos
      'email' => $email // Hace lo mismo con email
    ]
  ]);
  // Comprobar si la sesión se creó correctamente
  // if ($checkoutSession) {
  //   echo json_encode(['id' => $checkoutSession->id]); // Esta línea debería devolver el session_id
  // } else {
  //   echo json_encode(['error' => 'No se pudo crear la sesión de pago']);
  // }


  try {
    $conexionBD->beginTransaction(); // Iniciar una transacción SQL

    $insertTransactionQuery = "
      INSERT INTO transactions (email, euros_used , description, address)
      VALUES (:email,  :euros_used,  :description, :address)";

    $stmt = $conexionBD->prepare($insertTransactionQuery);

    $description = "Compra realizada en el sitio web utilizando Stripe.";

    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':euros_used', $totalPrice);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':address', $address);
    $stmt->execute();

    $conexionBD->commit(); // Confirmar la transacción SQL
    echo json_encode(['id' => $checkoutSession->id]); // Devolver el session_id

  } catch (PDOException $e) {
    $conexionBD->rollBack(); // Revertir cambios en caso de error
    error_log("Error al registrar la transacción: " . $e->getMessage());
    echo json_encode(['error' => 'Error al registrar la transacción en la base de datos']);
  }


} catch (\Stripe\Exception\ApiErrorException $e) {
  // Si ocurre un error, lo mostramos
  echo json_encode(['error' => $e->getMessage()]);

}



