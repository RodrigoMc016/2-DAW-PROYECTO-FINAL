<?php



//para que acepte cosas del CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8, Authorization");


//datos sobre la base de datos de mysql workbench para localhost
// $host = 'localhost';
// $dbname = 'timeless_flavour';
// $username = 'root';
// $password = 'admin1';


  $host ='fdb1028.awardspace.net';
  $dbname ='4555887_timelessflavour';
  $username ='4555887_timelessflavour';
  $password ='Admin1234_';

//conexion con la base de datos mediante PDO, se crea la variable de conexion con los atributos necesarios
try {
  $conexionBD = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $conexionBD->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //erorres en los atributos
} catch (PDOException $e) {
  echo json_encode(["error" => "No se logró conectar a la base de datos: " . $e->getMessage()]);
  exit();
}
?>
