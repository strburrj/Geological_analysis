//Keep the map and layers together

let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11,
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
}).addTo(myMap);

// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.light",
//     accessToken: API_KEY
//   });
// lightmap.addTo(myMap);

//JSON 
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(queryURL, function(data) {
    function getColor(i) {
        return i > 5 ? '#F30' :
        i > 4  ? '#F60' :
        i > 3  ? '#F90' :
        i > 2  ? '#FC0' :
        i > 1   ? '#FF0' :
                  '#9F3';
      }
    
   L.geoJson (data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,{
            radius: (feature.properties.mag)*4,
            fillColor: getColor(feature.properties.mag),
            stroke: true,
                color: "black",
                weight: 0.5,
                fillOpacity: 0.8,
        
        });
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.mag +
          "</h3><hr><p>" + new Date(feature.properties.place) + "</p>");
      }

   }).addTo(myMap)

//Code to potentially put a mini legend on the bottom

//    var info = L.control({
//     position: "bottomright"
//   });
// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
//   };
//   // Add the info legend to the map
//   info.addTo(map);
});

      


    


  




