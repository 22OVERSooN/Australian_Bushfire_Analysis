// Create initial map lot with empty marker layers

// Create initial map lot with empty marker layers

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

var myMap = L.map("map-id", {
  center: [-27, 132],
  zoom: 5,
  layers: [lightmap]
});

var baseMaps = {
    "Light Map": lightmap,
    "Satellite Map": satellitemap
  };


var url = "http://127.0.0.1:5000/";

var layerControl;
var sliderControl;
var bushFires;
var heat;

d3.json("http://127.0.0.1:5000/january").then(function(response) {

var bushfires = response;

    var bushFireMarkers = [];
  
    for (var index = 0; index < 500; index++) {
      var fire = bushfires[index];
  
      var bushFire = L.marker([fire.latitude, fire.longitude]).bindPopup("<h3>" + fire.date + "<h3><hr><p>Brightness: " + fire.brightness + "K</p>");
  
      bushFireMarkers.push(bushFire);
  
      var bushFires = L.layerGroup(bushFireMarkers);
    }

    var heatArray = [];

    var maxBright = 0;
  
    for (var i = 0; i < response.length; i++) {
  
      var fire = response[i];
  
      if (fire.brightness > maxBright) {
        maxBright = fire.brightness;
      }
  
      if (fire) {
        heatArray.push([fire.latitude, fire.longitude, fire.brightness/400.1]);
      }
    }
  
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
    });

    var overlayMaps = {
        "Bush Fires": bushFires,
        "Heat Map": heat
      };

    var sliderControl = L.control.sliderControl({position: "bottomleft", layer: bushFires});

    myMap.addControl(sliderControl);
  
    sliderControl.startSlider();
        
    var layerControl = L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
      })
      layerControl.addTo(myMap);
});


function createMarkers(response) {

    var bushfires = response;

    var bushFireMarkers = [];
  
    for (var index = 0; index < 500; index++) {
      var fire = bushfires[index];
  
      var bushFire = L.marker([fire.latitude, fire.longitude]).bindPopup("<h3>" + fire.date + "<h3><hr><p>Brightness: " + fire.brightness + "K</p>");
  
      bushFireMarkers.push(bushFire);
  
      var bushFires = L.layerGroup(bushFireMarkers);
    }

    var heatArray = [];

    var maxBright = 0;
  
    for (var i = 0; i < response.length; i++) {
  
      var fire = response[i];
  
      if (fire.brightness > maxBright) {
        maxBright = fire.brightness;
      }
  
      if (fire) {
        heatArray.push([fire.latitude, fire.longitude, fire.brightness/400.1]);
      }
    }
  
    var heat =  L.heatLayer(heatArray, {
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
    });

    var overlayMaps = {
        "Bush Fires": bushFires,
        "Heat Map": heat
      };
    
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

      var myMap = L.map("map-id", {
        center: [-27, 132],
        zoom: 5,
        layers: [lightmap]
      });

      var baseMaps = {
          "Light Map": lightmap,
          "Satellite Map": satellitemap
        };


    var sliderControl = L.control.sliderControl({position: "bottomleft", layer: bushFires});

    myMap.addControl(sliderControl);
  
    sliderControl.startSlider();

    var layerControl = L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
      })
      layerControl.addTo(myMap);
        
}


d3.selectAll(".btn").on("click", clearMap);


function clearMap() {
  console.log(this.value);
  var queryURL = url + this.value;
  console.log(queryURL);
  var container = L.DomUtil.get("mapbox");
  var map = L.DomUtil.get("map-id");
  map.remove();
  var newMap = L.DomUtil.create('div',"",container);
  newMap.setAttribute('id', "map-id");
  d3.json(queryURL).then(createMarkers);
}