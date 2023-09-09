<?php
// Database connection
$dbHost = 'basededatos.cnbw6moot2c2.us-east-1.rds.amazonaws.com';
$dbUser = 'manzur';
$dbPass = 'JuanD0212_2003';
$dbName = 'basededatos';

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch GPS data from the database
$sql = "SELECT * FROM posicion ORDER BY Timestamp DESC LIMIT 1";
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

// Close the database connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
