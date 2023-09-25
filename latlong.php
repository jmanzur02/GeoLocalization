<?php
// Conexión a la base de datos
include("db_credentials.php");

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if (!is_numeric($_GET['latitud']) || !is_numeric($_GET['longitud'])) {
    console.log("Las coordenadas no son válidas");
    console.log("Latitud: " . $_GET['latitud']);
    console.log("Longitud: " . $_GET['longitud']);
    return;
}

// Obtener las coordenadas del punto seleccionado desde la solicitud GET
$latitud = $_GET['latitud'];
$longitud = $_GET['longitud'];

// Obtener las fechas y horas desde la solicitud GET
$fechaInicio = $_GET['fechaInicio'];
$fechaFinal = $_GET['fechaFinal'];
$horaInicial = $_GET['horaInicial'];
$horaFinal = $_GET['horaFinal'];

// Definir el radio de búsqueda en metros (en este caso, 200 metros)
$radio = 200;

// Calcular las diferencias máximas permitidas en latitud y longitud
$latitud_diff = ($radio / 6371000) * (180 / pi());
$longitud_diff = ($radio / 6371000) * (180 / pi()) / cos(deg2rad($latitud));

// Calcular los límites para la búsqueda
$min_latitud = $latitud - $latitud_diff;
$max_latitud = $latitud + $latitud_diff;
$min_longitud = $longitud - $longitud_diff;
$max_longitud = $longitud + $longitud_diff;

// Consulta SQL para obtener las fechas y horas en las que el vehículo pasó por las coordenadas dentro del radio especificado
$sql_lat = "SELECT 'Timestamp' FROM posicion WHERE Latitud BETWEEN $min_latitud AND $max_latitud AND Longitud BETWEEN $min_longitud AND $max_longitud AND Timestamp BETWEEN '$fechaInicio $horaInicial' AND '$fechaFinal $horaFinal'";

$result_lat = $conn->query($sql_lat);

// Crear un arreglo para almacenar las fechas y horas
$latlong = array();

if ($result_lat->num_rows > 0) {
    while($row = $result_lat->fetch_assoc()) {
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
