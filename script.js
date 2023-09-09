$(document).ready(function() {

    var lastCoordinate = null;
    var penultimateCoordinate = null;


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

    function updateMap(lat, lng) {
        // Create a LatLng object for the latest coordinate
        var newCoordinate = new google.maps.LatLng(lat, lng);
    
        // Update the marker position
        marker.setPosition(newCoordinate);
    
        // Check if we have a valid last coordinate to draw a line from
        if (lastCoordinate) {
            // Create a Polyline between the last coordinate and the new coordinate
            var routePolyline = new google.maps.Polyline({
                path: [lastCoordinate, newCoordinate],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
    
            // Set the polyline on the map
            routePolyline.setMap(map);
        }
    
        // Update the lastCoordinate and penultimateCoordinate
        penultimateCoordinate = lastCoordinate;
        lastCoordinate = newCoordinate;
    }

   

    // Función para obtener y mostrar datos
    function fetchData() {
        $.ajax({
            type: "GET",
            url: "fetch_data.php",
            dataType: "json",
            success: function(data) {
                

                // Actualiza el contenedor de datos
                $("#dataContainer").empty();

                data.forEach(function(item) {
                    var dataBox = $("<div>").addClass("data-box");
                    dataBox.append("<p>Latitud: " + item.Latitud + "</p>");
                    dataBox.append("<p>Longitud: " + item.Longitud + "</p>");
                    dataBox.append("<p>Timestamp: " + item.Timestamp + "</p>");
                    $("#dataContainer").append(dataBox);
                    updateMap(item.Latitud, item.Longitud);
                });
            }
        });
    }

    // Obtiene los datos inicialmente
    fetchData();

    // Obtiene los datos cada 5 segundos
    setInterval(fetchData, 5000);
});
