/********************************************
    Map Stuff
********************************************/

function mapInit() {
  // Basemaps
  // Grayscale Imagery
  var imageryGray = L.tileLayer.grayscale('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    id: 'gscplanning.pfgp4j8o',
    accessToken: 'pk.eyJ1IjoiZ3NjcGxhbm5pbmciLCJhIjoiRVZMNXpsQSJ9.5OxUlJTCDplPkdkKNlB91A',
    quotaDividerTune: 3,
    maxNativeZoom: 18,
    maxZoom: 20
  });
  // True Color Imagery
  var imagery = L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    id: 'gscplanning.pfgp4j8o',
    accessToken: 'pk.eyJ1IjoiZ3NjcGxhbm5pbmciLCJhIjoiRVZMNXpsQSJ9.5OxUlJTCDplPkdkKNlB91A',
    maxNativeZoom: 18,
    maxZoom: 20
  });


  //Feature Layers
  //  Blue Grass Stockyard Site Plan
  var bgsLayer = L.tileLayer("//gis.gscplanning.com/tiles/BGS_SitePlan/{z}/{x}/{y}.png", { 
    "attribution": "<a href='http://lexingtonky.gov' target='_blank'>LFUCG</a>",
    maxZoom: 20
  });
  // Blue Grass Stockyard Fayette Parcel
  function bgsParcelStyle(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: "#e67e22",
      fillOpacity: 0
    }
  }

  var bgsParcel = new L.GeoJSON.AJAX("data/bgsParcel.geojson", {
    style: bgsParcelStyle
  });
  //RSA Basin Layer
  function rsaBasinStyle(feature) {
    return {
      weight: 0,
      color: "#2980b9",
      fillOpacity: 0.5
    }
  }

  var rsaBasin = new L.GeoJSON.AJAX("data/rsaBasin.geojson", {
    style: rsaBasinStyle
  })


  // initialize map
  map = new L.Map('map', {
      center: [38.154672, -84.535289],
      zoom: 15,
      minZoom: 11,
      maxZoom: 20,
      layers: [imageryGray, bgsLayer, rsaBasin, bgsParcel]
  });
  map.attributionControl.setPrefix(false).setPosition("bottomleft");

  var baseMaps = {
    "Imagery (B/W)": imageryGray,
    "Imagery (Color)": imagery
  };

  var overlayMaps = {
    "Royal Spring Aquifer (Basin)": rsaBasin,
    "Blue Grass Stockyards Parcel (Fayette Co.)": bgsParcel,
    "Blue Grass Stockyards (Proposed Site Plan)": bgsLayer    
  };

  L.control.layers(baseMaps,overlayMaps).addTo(map);
}



// Window load
$(window).load(function () {
    // initialize map
    mapInit();
});
