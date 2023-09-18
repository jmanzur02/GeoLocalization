<?php
// Database connection
$dbHost = 'basededatos.cnbw6moot2c2.us-east-1.rds.amazonaws.com';
$dbUser = 'manzur';
$dbPass = 'JuanD0212_2003';
$dbName = 'basededatos';

// Validate and sanitize input
$fechaInicio = $_POST['fechaInicio'];
$fechaFinal = $_POST['fechaFinal'];

// Validate date format (adjust this format if needed)
if (!strtotime($fechaInicio) || !strtotime($fechaFinal)) {
    die("Invalid date format provided.");
}

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sqlRango = "SELECT Latitud, Longitud FROM posicion WHERE Timestamp >= ? AND Timestamp <= ?";
$stmt = $conn->prepare($sqlRango);

// Bind parameters
$stmt->bind_param("ss", $fechaInicio, $fechaFinal);

// Execute the query
if ($stmt->execute()) {
    $resultRango = $stmt->get_result();

    $dataRango = [];
    while ($row = $resultRango->fetch_assoc()) {
        $dataRango[] = [
            'Latitud' => $row['Latitud'],
            'Longitud' => $row['Longitud']
        ];
    }

    // Close the database connection
    $stmt->close();
    $conn->close();

    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($dataRango);
} else {
    // Handle query execution error
    echo "Error executing the query: " . $stmt->error;
}
?>
