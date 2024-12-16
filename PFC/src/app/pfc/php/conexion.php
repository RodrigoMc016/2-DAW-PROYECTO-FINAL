<?php

//control de errores
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

//para que acepte cosas del CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");


//datos sobre la base de datos de mysql workbench para localhost
//  $host = 'localhost';
//  $dbname = 'timeless_flavour';
//  $username = 'root';
//  $password = 'admin1';


 $host ='fdb1028.awardspace.net';
 $dbname ='4555887_timelessflavour';
 $username ='4555887_timelessflavour';
 $password ='Admin1234_';

//conexion con la base de datos mediante PDO
try {
    $conexionBD = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conexionBD->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "No se logró conectar a la base de datos: " . $e->getMessage()]);
    exit();
}
?>
