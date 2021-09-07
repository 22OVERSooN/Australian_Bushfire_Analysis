



function createMap(bushFires, heat) {
  
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY});


  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });
  
  var baseMaps = {
    "Light Map": lightmap,
    "Satellite Map": satellitemap
  };

    var overlayMaps = {
    "Bush Fires": bushFires,
    "Heat Map": heat
  };

  var myMap = L.map("map-id", {
    center: [-27, 132],
    zoom: 5,
    layers: [lightmap]
  });
      
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
  }

function createMarkers(response) {

  
  var bushfires = response;


  var bushFires = [];

  
  for (var index = 0; index < 1000; index++) {
    var fire = bushfires[index];

    var bushFire = L.marker([fire.latitude, fire.longitude]);

    bushFires.push(bushFire);
  }

  var markers = L.markerClusterGroup({});

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i];

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.latitude, location.longitude])
        .bindPopup(response[i].descriptor));
    }
  }

  var heatArray = [];

  var maxBright = 0;

  for (var i = 0; i < response.length; i++) {

    var fire = response[i];

    if (fire.brightness > maxBright) {
      maxBright = fire.brightness;
    }

    if (fire) {
      heatArray.push([fire.latitude, fire.longitude, fire.brightness/500]);
    }
  }

  console.log(heatArray);

  var heat = L.heatLayer(heatArray, {
    radius: 6,
    blur: 0,
    maxZoom: 5,
    gradient: {
      0.2: "blue",
      0.4: "lime",
      0.6: "yellow",
      0.8: "red",
      1.0: "black"
    }
  })

  createMap(markers, heat);
}


// d3.json("static/js/data.json").then(function printAll(response) {
//   console.log(response);
// });
// d3.json("static/js/data.json").then(createMarkers);
d3.json("http://127.0.0.1:5000/january").then(createMarkers);