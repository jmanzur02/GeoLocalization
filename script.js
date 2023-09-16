$(document).ready(function() {
    $.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");

     // Agrega el evento click a los botones
     $("#fechaInicio").click(function() {
        // Abre el date picker
        $(this).datepicker({
            yearRange: "2023:2024",
            todayHighlight: true,
            autoclose: true,
        });
    });

    $("#fechaFin").click(function() {
        // Abre el date picker
        $(this).datepicker({
            yearRange: "2023:2024",
            todayHighlight: true,
            autoclose: true,
        });
    });

    // Obtiene la fecha y la hora seleccionadas
    $("#fechaInicio").on("change", function() {
        var fechaInicio = $(this).datepicker("getDate");
        $("#fechaInicioHidden").val(fechaInicio);
    });

    $("#fechaFin").on("change", function() {
        var fechaFin = $(this).datepicker("getDate");
        $("#fechaFinHidden").val(fechaFin);
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

    // Obtiene los datos inicialmente
    fetchData();

    // Obtiene los datos cada 5 segundos
    setInterval(fetchData, 5000);
});
