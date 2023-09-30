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
        <h1>Consulta de históricos</h1>
        <p> Seleccione el intervalo de tiempo para consultar una ruta específica del vehículo:</p>
        <p> Pulse en cualquier lugar  del mapa para observar en qué fechas estuvo el vehículo alrededor de esa posición</p>  
        <label for="fechaInicio">Fecha de Inicio:</label>
        <input type="text" id="fechaInicio" name="fechaInicio" />
        
        <label for="fechaFinal">Fecha Final:</label>
        <input type="text" id="fechaFinal" name="fechaFinal" />

        <label for="horaInicial">Hora Inicial:</label>
        <input type="time" id="horaInicial" name="horaInicial" />
        
        <label for="horaFinal">Hora Final:</label>
        <input type="time" id="horaFinal" name="horaFinal" />
        
        <button id="trazar-ruta">Trazar ruta</button>
        <button id="borrar-trazado">Borrar histórico</button>
        <div id="map"></div>
        <div id="date-slider-container">
        <h2>Fechas disponibles en la posición pulsada</h2>
        <div id="date-slider">
            <!-- Aquí se mostrarán las fechas -->
        </div>
    </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.css">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAp5birBy8ELAwJKpgqApyKXgQkPzUFjAg"></script>
    <script src="script2.js"></script>
</body>
</html>