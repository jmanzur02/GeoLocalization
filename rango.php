<?php
// Database connection
$dbHost = 'basededatos.cnbw6moot2c2.us-east-1.rds.amazonaws.com';
$dbUser = 'manzur';
$dbPass = 'JuanD0212_2003';
$dbName = 'basededatos';


$fechaInicio = $_POST['fechaInicio'];
$fechaFinal = $_POST['fechaFinal'];


$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}




$sqlRango = "SELECT Latitud, Longitud FROM posicion WHERE Timestamp >= '$fechaInicio' AND Timestamp <= '$fechaFinal'";
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

// Close the database connection
$conn->close();



// Return data as JSON
header('Content-Type: application/json');
echo json_encode($dataRango);
?>