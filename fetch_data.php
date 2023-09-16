<?php
// Database connection
$dbHost = 'host';
$dbUser = 'user';
$dbPass = 'password';
$dbName = 'database';


$fechaInicio = $_POST['fechaInicio'];
$fechaFinal = $_POST['fechaFinal'];
$horaInicial = $_POST['horaInicial'];
$horaFinal = $_POST['horaFinal'];


$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch GPS data from the database
$sql = "SELECT * FROM posicion ORDER BY Timestamp DESC LIMIT 2";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'Latitud' => $row['Latitud'],
            'Longitud' => $row['Longitud'],
            'Timestamp' => $row['Timestamp']
        ];
    }
}

$sqlRango = "SELECT * FROM posicion WHERE Timestamp >= '$fechaInicio $horaInicial' AND Timestamp <= '$fechaFinal $horaFinal'";
$resultRango = $conn->query($sqlRango);

$dataRango = [];
if ($resultRango->num_rows > 0) {
    while ($row = $resultRango->fetch_assoc()) {
        $dataRango[] = [
            'Latitud' => $row['Latitud'],
            'Longitud' => $row['Longitud'],
            'Timestamp' => $row['Timestamp']
        ];
    }
}

// Close the database connection
$conn->close();

$response = [
    'ultimos' => $data,
    'rango' => $dataRango
];

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
