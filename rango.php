<?php
// Database connection
$dbHost = 'basededatos.cnbw6moot2c2.us-east-1.rds.amazonaws.com';
$dbUser = 'manzur';
$dbPass = 'JuanD0212_2003';
$dbName = 'basededatos';

// Obtén las fechas de inicio y finalización desde el cliente
$fechaInicio = $_GET['fechaInicio'];
$fechaFinal = $_GET['fechaFinal'];
$horaInicial = $_GET['horaInicial'];
$horaFinal = $_GET['horaFinal'];




$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}


$sqlRango = "SELECT Latitud, Longitud FROM posicion WHERE Timestamp >= '$fechaInicio $horaInicial' AND Timestamp <= '$fechaFinal $horaFinal'";
$resultRango = $conn->query($sqlRango);

$dataRango = [];
if ($resultRango->num_rows > 0) {
    while ($row = $resultRango->fetch_assoc()) {
        $dataRango[] = [
            'Latitud' => $row['Latitud'],
            'Longitud' => $row['Longitud']
        ];
    }
}

// Cierra la conexión a la base de datos
$conn->close();

// Devuelve los datos como JSON
header('Content-Type: application/json');
echo json_encode($dataRango);
?>
