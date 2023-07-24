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
        $sql = "SELECT * FROM articulos";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $articulos = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $articulos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($articulos);
        break;
    case "POST":
        $articulo = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO articulos(
            id, 
            nombre, 
            id_tipo, 
            cantidad, 
            fecha_vencimiento, 
            imagen, 
            id_farmaceuta) 
            VALUES(
            null, 
            :nombre, 
            :id_tipo, 
            :cantidad, 
            :fecha_vencimiento, 
            :imagen, 
            :id_farmaceuta
            )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $articulo->nombre);
        $stmt->bindParam(':id_tipo', $articulo->id_tipo);
        $stmt->bindParam(':cantidad', $articulo->cantidad);
        $stmt->bindParam(':fecha_vencimiento', $articulo->fecha_vencimiento);
        $stmt->bindParam(':imagen', $articulo->imagen);
        $stmt->bindParam(':id_farmaceuta', $articulo->id_farmaceuta);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $data = json_decode(file_get_contents('php://input'), true);

        $sql = "UPDATE articulos SET 
                    nombre = :nombre, 
                    id_tipo = :id_tipo, 
                    cantidad = :cantidad, 
                    fecha_vencimiento = :fecha_vencimiento, 
                    imagen = :imagen, 
                    id_farmaceuta = :id_farmaceuta 
                    WHERE id = :id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':id_tipo', $data['id_tipo']);
        $stmt->bindParam(':cantidad', $data['cantidad']);
        $stmt->bindParam(':fecha_vencimiento', $data['fecha_vencimiento']);
        $stmt->bindParam(':imagen', $data['imagen']);
        $stmt->bindParam(':id_farmaceuta', $data['id_farmaceuta']);
        $stmt->bindParam(':id', $data['id']); // Asegúrate de que el ID esté incluido en los datos enviados desde React.

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $sql = "DELETE FROM articulos WHERE id = :id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}