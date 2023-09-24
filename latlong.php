<?php
// Conexión a la base de datos
include("db_credentials.php");

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener las coordenadas del punto seleccionado desde la solicitud GET
$latitud = $_GET['latitud'];
$longitud = $_GET['longitud'];

// Obtener las fechas y horas desde la solicitud GET
$fechaInicio = $_GET['fechaInicio'];
$fechaFinal = $_GET['fechaFinal'];
$horaInicial = $_GET['horaInicial'];
$horaFinal = $_GET['horaFinal'];

// Consulta SQL para obtener las fechas y horas en las que el vehículo pasó por las coordenadas
$sql = "SELECT 'Timestamp' FROM posicion WHERE Latitud = $latitud AND Longitud = $longitud
        AND Timestamp BETWEEN '$fechaInicio $horaInicial' AND '$fechaFinal $horaFinal'";

$result = $conn->query($sql);

// Crear un arreglo para almacenar las fechas y horas
$latlong = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $latlong[] = array(
            "Timestamp" => $row["Timestamp"]
        );
    }
}

// Cerrar la conexión a la base de datos
$conn->close();

// Devolver los datos como JSON
echo json_encode($latlong);
?>