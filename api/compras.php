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
        $sql = "SELECT * FROM compras";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $compras = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $compras = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($compras);
        break;
    case "POST":
        $compras = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO compras(
            id, 
            id_producto, 
            cantidad_producto, 
            id_tipo, 
            fecha_vencimiento_producto, 
            fecha_compra, 
            lote,
            id_proveedor,
            id_empleado
            ) 
            VALUES(
            null, 
            :id_producto, 
            :cantidad_producto, 
            :id_tipo, 
            :fecha_vencimiento_producto, 
            :fecha_compra, 
            :lote,
            :id_proveedor,
            :id_empleado
            )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_producto', $compras->id_producto);
        $stmt->bindParam(':cantidad_producto', $compras->cantidad_producto);
        $stmt->bindParam(':id_tipo', $compras->id_tipo);
        $stmt->bindParam(':fecha_vencimiento_producto', $compras->fecha_vencimiento_producto);
        $stmt->bindParam(':fecha_compra', $compras->fecha_compra);
        $stmt->bindParam(':lote', $compras->lote);
        $stmt->bindParam(':id_proveedor', $compras->id_proveedor);
        $stmt->bindParam(':id_empleado', $compras->id_empleado);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $compras = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE compras SET 
                    id_producto= :id_producto, 
                    cantidad_producto= :cantidad_producto, 
                    id_tipo =:id_tipo, 
                    fecha_vencimiento_producto= :fecha_vencimiento_producto, 
                    fecha_compra= :fecha_compra, 
                    lote= :lote,
                    id_proveedor= :id_proveedor, 
                    id_empleado= :id_empleado 
                    WHERE id = :id";
                    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_producto', $compras->id_producto);
        $stmt->bindParam(':cantidad_producto', $compras->cantidad_producto);
        $stmt->bindParam(':id_tipo', $compras->id_tipo);
        $stmt->bindParam(':fecha_vencimiento_producto', $compras->fecha_vencimiento_producto);
        $stmt->bindParam(':fecha_compra', $compras->fecha_compra);
        $stmt->bindParam(':lote', $compras->lote);
        $stmt->bindParam(':id_proveedor', $compras->id_proveedor);
        $stmt->bindParam(':id_empleado', $compras->id_empleado);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM compras WHERE id = :id";
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