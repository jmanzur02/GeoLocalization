$(document).ready(function() {
    $.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");

    // Configura los date pickers para incluir fecha y hora
    $("#fechaInicio, #fechaFinal").datetimepicker({
        dateFormat: "yy-mm-dd",
        timeFormat: "HH:mm:ss",
        showSecond: true,
        showMillisec: false,
        timeInput: true
        
    });

    $("#horaInicial, #horaFinal").timepicker({
        timeFormat: "HH:mm",
        showSecond: true,
        showMillisec: false,
        timeInput: true
        
    });


    var fechaInicio;
    var fechaFinal;
    var horaInicial;
    var horaFinal;

    // Establece los eventos de cambio para actualizar las variables de fecha
    $("#fechaInicio").on("change", function() {
        fechaInicio = $("#fechaInicio").datetimepicker("getDate");
        console.log(fechaInicio);
    });

    $("#fechaFinal").on("change", function() {
        fechaFinal = $("#fechaFinal").datetimepicker("getDate");
        console.log(fechaFinal);
    });

    $("#horaInicial").on("change", function() {
        horaInicial = $("#horaInicial").timepicker("getTime");
        console.log(horaInicial);
    });

    $("#horaFinal").on("change", function() {
        horaFinal = $("#horaFinal").timepicker("getTime");
        console.log(horaFinal);
    });

    // Crea un nuevo objeto de mapa
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 18,
    });

    // Crea un nuevo objeto de marcador
    var marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map,
    });

   
    function fetchData() {
        $.ajax({
            type: "GET",
            url: "fetch_data.php",
            dataType: "json",
            success: function(data) {

                if (data.length >= 2) {
                    // Crea un objeto de línea
                    var line = new google.maps.Polyline({
                        path: [],
                        strokeColor: "#0000FF",
                        strokeOpacity: 0.8,
                        strokeWeight: 5,
                    });

                    line.getPath().clear();

                    // Agrega los puntos de la línea al objeto de línea
                    for (var i = 0; i < data.length; i++) {
                        line.getPath().push(new google.maps.LatLng(data[i].Latitud, data[i].Longitud));
                        // Agrega la línea al mapa
                        line.setMap(map);
                    }

                    // Agrega el evento click al botón
                    $("#borrar-rutas").click(function() {
                        // Elimina la línea del mapa
                        line.setMap(null);
                    });
                }
                

                // Actualiza la posición del marcador
                var position = new google.maps.LatLng(data[0].Latitud, data[0].Longitud);
                marker.setPosition(position);

                // Centra el mapa en la posición del marcador
                map.setCenter(position);

                // Actualiza el contenedor de datos
                $("#dataContainer").empty();

                data.forEach(function(item) {
                    var dataBox = $("<div>").addClass("data-box");
                    dataBox.append("<p>Latitud: " + item.Latitud + "</p>");
                    dataBox.append("<p>Longitud: " + item.Longitud + "</p>");
                    dataBox.append("<p>Timestamp: " + item.Timestamp + "</p>");
                    $("#dataContainer").append(dataBox);
                });
            }
        });
    }

    function dibujarRuta() {
        $.ajax({
            type: "GET",
            url: "rango.php",
            dataType: "json",
            success: function(dataRango){
                // Verifica que haya al menos dos puntos para trazar la ruta
                if (dataRango.length >= 2) {
                    // Crea un objeto de línea
                    var line_route = new google.maps.Polyline({
                        path: [],
                        strokeColor: "#FF0000", // Color de la línea (rojo en este ejemplo)
                        strokeOpacity: 0.8,
                        strokeWeight: 3, // Grosor de la línea
                    });
            
                    // Agrega los puntos de la línea al objeto de línea
                    for (var i = 0; i < dataRango.length; i++) {
                        line_route.getPath().push(new google.maps.LatLng(dataRango[i].Latitud, dataRango[i].Longitud));
                    }
            
                    // Agrega la línea al mapa
                    line_route.setMap(map);
                } else {
                    alert("No hay suficientes datos para trazar la ruta.");
                }

            } 
        })

        
    }
    
    // Llama a la función para trazar la ruta cuando se haga clic en un botón
    $("#trazar-ruta").click(function() {
        dibujarRuta(); // Pasa el arreglo dataRango para trazar la ruta
    });

    // Obtiene los datos inicialmente
    fetchData();

    // Obtiene los datos cada 5 segundos
    setInterval(fetchData, 5000);
});