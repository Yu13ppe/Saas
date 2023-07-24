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
        $sql = "SELECT * FROM proveedores";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $proveedores = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $proveedores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($proveedores);
        break;
    case "POST":
        $empleado = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO proveedores(
            id, 
            nombre, 
            rif, 
            telefono, 
            correo
            ) 
            VALUES(
            null, 
            :nombre, 
            :rif, 
            :telefono, 
            :correo 
            )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $empleado->nombre);
        $stmt->bindParam(':rif', $empleado->rif);
        $stmt->bindParam(':telefono', $empleado->telefono);
        $stmt->bindParam(':correo', $empleado->correo);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $empleado = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE proveedores SET 
        nombre= :nombre, 
        rif =:rif, 
        telefono= :telefono, 
        correo= :correo 
        WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $empleado->nombre);
        $stmt->bindParam(':rif', $empleado->rif);
        $stmt->bindParam(':telefono', $empleado->telefono);
        $stmt->bindParam(':correo', $empleado->correo);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM proveedores WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}