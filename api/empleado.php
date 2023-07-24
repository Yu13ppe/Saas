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
        $sql = "SELECT * FROM empleados";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $empleados = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $empleados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($empleados);
        break;
    case "POST":
        $empleado = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO empleados(
            id, 
            nombre_emp, 
            apellido, 
            cedula, 
            telefono_emp, 
            direccion
            ) 
            VALUES(
            null, 
            :nombre_emp, 
            :apellido, 
            :cedula, 
            :telefono_emp, 
            :direccion 
            )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre_emp', $empleado->nombre_emp);
        $stmt->bindParam(':apellido', $empleado->apellido);
        $stmt->bindParam(':cedula', $empleado->cedula);
        $stmt->bindParam(':telefono_emp', $empleado->telefono_emp);
        $stmt->bindParam(':direccion', $empleado->direccion);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $empleado = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE empleados SET 
                    nombre_emp = :nombre_emp, 
                    apellido =:apellido, 
                    cedula =:cedula, 
                    telefono_emp = :telefono_emp, 
                    direccion= :direccion 
                    WHERE id = :id";
                    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre_emp', $empleado->nombre_emp);
        $stmt->bindParam(':apellido', $empleado->apellido);
        $stmt->bindParam(':cedula', $empleado->cedula);
        $stmt->bindParam(':telefono_emp', $empleado->telefono_emp);
        $stmt->bindParam(':direccion', $empleado->direccion);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM empleados WHERE id = :id";
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