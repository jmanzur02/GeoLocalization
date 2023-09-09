$(document).ready(function() {
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

    // Crea una nueva instancia de Polyline.js
    //var polyline = require('@mapbox/polyline');

    // Función para obtener y mostrar datos
    function fetchData() {
        $.ajax({
            type: "GET",
            url: "fetch_data.php",
            dataType: "json",
            success: function(data) {
                // Decodifica la polilínea
                var decodedPath = polyline.decode(data[0].Polyline);

                // Crea una nueva instancia de Polyline
                var routePath = new google.maps.Polyline({
                    path: decodedPath,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                routePath.setMap(map);

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
