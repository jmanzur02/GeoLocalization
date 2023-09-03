<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAp5birBy8ELAwJKpgqApyKXgQkPzUFjAg&callback=initMap"></script>
    <title>Real-Time GPS Data</title>
</head>
<body>
    <div class="container">
        <h1>Coordenadas en tiempo real</h1>
        <div class="data-container" id="dataContainer">
            <!-- Data will be dynamically inserted here -->
        </div>
        <div id="map" style="width: 100%; height: 500px;"></div>
    </div>
</body>
</html>
