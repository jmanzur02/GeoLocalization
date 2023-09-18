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
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.min.css">
</head>
<body>
    <div class="container">
        <h1>Coordenadas en tiempo real</h1>
        <div class="data-container" id="dataContainer">
            <!-- Data will be dynamically inserted here -->
        </div>
        <label for="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" name="fechaInicio" data-date-range="2023/2023"/>
        
        <label for="fechaFinal">Fecha Final:</label>
        <input type="date" id="fechaFinal" name="fechaFinal" data-date-range="2023/2023"/>

        <label for="horaInicial">Hora Inicial:</label>
        <input type="time" id="horaInicial" name="horaInicial" data-date-range="2023/2023"/>
        <label for="horaFinal">Hora Final:</label>
        <input type="time" id="horaFinal" name="horaFinal" data-date-range="2023/2023"/>
        <button id="trazar-ruta">Trazar ruta</button>
        <div id="map"></div>
        <button id="borrar-rutas">Borrar rutas</button>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAp5birBy8ELAwJKpgqApyKXgQkPzUFjAg"></script>
    <script src="https://cdn.rawgit.com/xdan/datetimepicker/gh-pages/jquery.datetimepicker.full.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
