<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT id, id_producto, cantidad_producto, ROW_NUMBER() OVER (PARTITION BY id_producto ORDER BY fecha_compra) AS numero_compra FROM compras;";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id_producto = :id_producto";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id_producto', $path[3]);
            $stmt->execute();
            $conteo = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $conteo = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($conteo);
        break;
}