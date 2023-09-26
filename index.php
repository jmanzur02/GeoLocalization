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
    <div class="container">
        <h1>Coordenadas en tiempo</h1>
        <p> Seleccione el intervalo de tiempo para consultar una ruta específica del vehículo</p> 
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
        <button id="borrar-rutas">Borrar rutas</button>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>¿Cuándo pasó el vehículo por el lugar seleccionado?</h2>
                <ul id="date-time-list">
                    <!-- Aquí se mostrarán las fechas y horas -->
                </ul>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.css">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAp5birBy8ELAwJKpgqApyKXgQkPzUFjAg"></script>
    <script src="script.js"></script>
</body>
</html>
