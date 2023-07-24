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
        $sql = "SELECT * FROM farmaceuta";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $farmaceuta = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $farmaceuta = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($farmaceuta);
        break;
    case "POST":
        $farmaceuta = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO farmaceuta(
            id, 
            nombre_doc
            ) 
            VALUES(
            null, 
            :nombre_doc
            )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre_doc', $farmaceuta->nombre_doc);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $farmaceuta = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE farmaceuta SET 
        nombre_doc= :nombre_doc 
        WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre_doc', $farmaceuta->nombre_doc);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM farmaceuta WHERE id = :id";
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