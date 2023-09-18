$(document).ready(function() {
    $.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");

    $("#fechaInicio, #fechaFinal").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $("#horaInicial, #horaFinal").timepicker({
        timeFormat: "HH:mm",
        showSecond: true,
        controlType: 'select'
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

     // Función para trazar la ruta
    function drawRoute(dataRango) {
    // Verifica que los datos sean válidos
        if (dataRango.length >= 2) {
            // Crea un objeto de línea
            var line = new google.maps.Polyline({
                path: [],
                strokeColor: "#0000FF" , // Color de la línea
                strokeOpacity: 0.8, // Opacidad de la línea
                strokeWeight: 5, // Grosor de la línea
            });

            // Agrega los puntos de la línea al objeto de línea
            for (var i = 0; i < dataRango.length; i++) {
                line.getPath().push(new google.maps.LatLng(dataRango[i].Latitud, dataRango[i].Longitud));
            }

            // Agrega la línea al mapa
            line.setMap(map);
        } else {
            alert("No hay suficientes datos para trazar la ruta.");
        }
    }

    // Función para trazar la ruta
    function drawRoute(dataRango) {
        // Verifica que los datos sean válidos
        if (dataRango.length >= 2) {
            // Crea un objeto de línea
            var line = new google.maps.Polyline({
                path: [],
                strokeColor: "#0000FF", // Color de la línea
                strokeOpacity: 0.8, // Opacidad de la línea
                strokeWeight: 5, // Grosor de la línea
            });

            // Agrega los puntos de la línea al objeto de línea
            for (var i = 0; i < dataRango.length; i++) {
                line.getPath().push(new google.maps.LatLng(dataRango[i].Latitud, dataRango[i].Longitud));
            }

            // Agrega la línea al mapa
            line.setMap(map);
        } else {
            alert("No hay suficientes datos para trazar la ruta.");
        }
    }

    // Llama a la función para trazar la ruta cuando se haga clic en un botón
    $("#trazar-ruta").click(function() {
        // Obtiene los valores de fecha y hora inmediatamente
        var fechaInicio = $("#fechaInicio").val();
        var fechaFinal = $("#fechaFinal").val();
        var horaInicial = $("#horaInicial").val();
        var horaFinal = $("#horaFinal").val();

        // Verifica que las fechas sean válidas
        if (fechaInicio && fechaFinal && horaInicial && horaFinal) {
            // Realiza la solicitud AJAX inmediatamente
            $.ajax({
                type: "GET", 
                url: "rango.php",
                dataType: "json",
                data: {
                    fechaInicio: fechaInicio,
                    fechaFinal: fechaFinal,
                    //horaInicial: horaInicial,
                    //horaFinal: horaFinal
                },
                success: function(dataRango) {
                    // Procesa los datos y traza la ruta
                    drawRoute(dataRango);
                },
            });
        } else {
            alert("Por favor, selecciona fechas y horas válidas.");
        }
    });

    // Obtiene los datos inicialmente
    fetchData();

    // Obtiene los datos cada 5 segundos
    setInterval(fetchData, 5000);
});