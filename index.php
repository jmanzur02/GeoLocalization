<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location on Map</title>
    <style>
        #map {
            height: 400px;
            width: 100%;
        }
    </style>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <header>
        <div class="navbar">
        <a class="navbar-brand" href="#">
            <img src="logo.png" alt="Logo de la empresa">
        </a>
            <ul>
                <li><a href="index.php">Tiempo real</a></li>
                <li><a href="index2.php">Consulta de históricos</a></li>
            </ul>
        </div>
    <header>
    <div class="container">
        <h1>Ubicación en tiempo real</h1>
        
        
        <div id="map"></div>
        <button id="borrar-rutas">Borrar rutas</button>
    
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.css">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAp5birBy8ELAwJKpgqApyKXgQkPzUFjAg"></script>
    <script src="script.js"></script>
</body>
</html>
