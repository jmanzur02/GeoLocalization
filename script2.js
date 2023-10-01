var fechaInicio, fechaFinal, horaInicial, horaFinal, circle, radioSeleccionado;
$(document).ready(function() {
    
    $.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");

    $("#fechaInicio, #fechaFinal").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $("#horaInicial, #horaFinal").timepicker({
        showOn: "focus",
        timeFormat: "HH:mm",
        showSecond: false,
        controlType: 'select'
    });
    $("#horaInicial").on("focus", function() {
        // Oculta el selector de fechas instantáneamente
        $("#horaInicial").timepicker('hide', 'instant');
    });
    $("#horaFinal").on("focus", function() {
        // Oculta el selector de fechas instantáneamente
        $("#horaFinal").timepicker('hide', 'instant');
    });

    $("#fechaInicio").val("2023-09-05");
    $("#horaInicial").val("00:00");
    $("#fechaFinal").val("2023-09-20");
    $("#horaFinal").val("23:59");

    // Crea un nuevo objeto de mapa
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.96854, lng: -74.78132 },
        zoom: 12,
    });

    // Crea un nuevo objeto de marcador
    var marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map,
    });

    google.maps.event.addListener(map, 'click', function(event) {
        var clickedLatLng = event.latLng;
    
        var latitud = clickedLatLng.lat();
        var longitud = clickedLatLng.lng();
    
        var fechaInicio = $("#fechaInicio").val();
        var fechaFinal = $("#fechaFinal").val();
        var horaInicial = $("#horaInicial").val();
        var horaFinal = $("#horaFinal").val();

        if (latitud && longitud && fechaInicio && fechaFinal && horaInicial && horaFinal){

            if (circle) {
                circle.setMap(null);
            }

            var radioInicial = 200;

            // Crea un nuevo círculo con radio de 200 metros en la ubicación seleccionada
            circle = new google.maps.Circle({
                map: map,
                center: clickedLatLng,
                radius: 200, // Radio en metros
                fillColor: '#FF0000',
                fillOpacity: 0.2,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
            
            });
            
            marker.setPosition({lat:latitud,lng:longitud});
            $.ajax({
                type: "GET", 
                url: "latlong.php",
                dataType: "json",
                data: {
                    latitud: latitud,
                    longitud: longitud,
                    fechaInicio: fechaInicio,
                    fechaFinal: fechaFinal,
                    horaInicial: horaInicial,
                    horaFinal: horaFinal,
                    radioSeleccionado: radioSeleccionado
                },
                success: function(latlong) {
                    console.log("Los parámetros recibidos son: " + JSON.stringify(latlong));
                    var dateSlider = $("#date-slider");

                    dateSlider.empty(); // Limpia el contenido existente


                    if (latlong.length>0){
                        for (var i = 0; i < latlong.length; i++) {
                            var dateItem = $("<div>");
                            dateItem.text(latlong[i].Timestamp);
                            dateSlider.append(dateItem);
                        }
                        $("#date-slider-container").slider({
                            range: "min",
                            min: 0,
                            max: latlong.length - 1,
                            slide: function (event, ui) {
                                var selectedDate = latlong[ui.value].Timestamp;
                                var selectedLat = parseFloat(latlong[ui.value].Latitud);
                                console.log(selectedLat);
                                var selectedLng = parseFloat(latlong[ui.value].Longitud);
                                console.log(selectedLng);
                                console.log("Fecha seleccionada:", selectedDate);
                                placeMarker(selectedLat, selectedLng, selectedDate);
                            }
                        });

                    }else{
                        alert("No se encontró información en la base de datos para el lugar seleccionado");
                    };
                    function placeMarker(lat, lng, date) {
                        // Elimina el marcador anterior si existe
                        if (marker) {
                            marker.setMap(null);
                        }
                    
                        // Crea un nuevo marcador
                        marker = new google.maps.Marker({
                            position: { lat: lat, lng: lng },
                            map: map,
                            title: date // Puedes utilizar la fecha como título del marcador
                        });

                        $("#selected-date-label").text("Fecha correspondiente a la ubicación mostrada: " + date);

                    }

                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Error en la solicitud AJAX: " + textStatus + " - " + errorThrown);
                }
            });

        }else{
            alert("Por favor, selecciona latitud y longitud, fechas y horas válidas.");
        }
    });

     

    // Función para trazar la ruta
    function drawRoute(dataRango) {
        console.log("Los parámetros recibidos son: " + JSON.stringify(dataRango));
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

            $("#borrar-trazado").click(function() {
                // Elimina la línea del mapa
                line.setMap(null);
            });
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
            if ((fechaInicio == fechaFinal) && (horaInicial<horaFinal)){
                // Realiza la solicitud AJAX inmediatamente
                console.log("realizado");
                $.ajax({
                    type: "GET", 
                    url: "rango.php",
                    dataType: "json",
                    data: {
                        fechaInicio: fechaInicio,
                        fechaFinal: fechaFinal,
                        horaInicial: horaInicial,
                        horaFinal: horaFinal
                    },
                    success: function(dataRango) {
                        // Procesa los datos y traza la ruta
                        drawRoute(dataRango);
                    },
                });
            }
            if ((fechaInicio == fechaFinal) && (horaInicial>horaFinal)){
                alert("Si desea buscar registros del mismo día, por favor ingrese horas validas");
            };
            if ((fechaInicio>fechaFinal)){
                alert("Ingrese un rango de fechas válido");
            }
            if (fechaInicio<fechaFinal){
                console.log("realizado");
                $.ajax({
                    type: "GET", 
                    url: "rango.php",
                    dataType: "json",
                    data: {
                        fechaInicio: fechaInicio,
                        fechaFinal: fechaFinal,
                        horaInicial: horaInicial,
                        horaFinal: horaFinal
                    },
                    success: function(dataRango) {
                        // Procesa los datos y traza la ruta
                        drawRoute(dataRango);
                    },
                });
            }

           
        } else {
            alert("Por favor, selecciona fechas y horas válidas.");
        }
    });
    
});