<?
require "conexion.php";

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Responder a solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit; // Termina la ejecución para solicitudes OPTIONS
}



$datos = json_decode(file_get_contents("php://input"), true);


if (isset($datos["email"]) && isset($datos["rating"]) && isset($datos["comments"])) {
  $email = $datos["email"];
  $rating = (int) $datos["rating"];
  $comments = $datos["comments"];


  //Consulta para insertar los valores del formulario en la tabla feedback
  $sql = "INSERT INTO feedback (user_id, rating, message)
            VALUES ((SELECT id FROM users WHERE email = '$email'), $rating, '$comments')";

  if ($conn->query($sql) == true) {
    echo json_encode(["message" => "Feedback enviado"]);

  } else {
    echo json_encode(["message" => "Error:" . $conn->error]);
  }
} else {
  echo json_encode(["message" => "Faltan datos"]);
}


$conn->close();
?>
