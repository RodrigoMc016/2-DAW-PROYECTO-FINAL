<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$dbname = 'timeless_flavour';
$username = 'root';
$password = 'admin1';

try {
    $conexionBD = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conexionBD->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "No se logró conectar a la base de datos: " . $e->getMessage()]);
    exit();
}
?>
