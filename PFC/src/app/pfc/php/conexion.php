<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$host = 'localhost';
$name = 'timeless_flavour';
$username = 'root';
$password = 'admin1';

try {
  $conexionBD = new PDO("mysql:host=$host;name=$name", $username, $password);
} catch (PDOException $e) {
  echo("No se logro conectar a la base de datos $name por el error: $err");
  exit();
}

?>
