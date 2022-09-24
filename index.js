// This example creates a simple polygon representing the Bermuda Triangle.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 6657451.69080318, lng: 2900747.52897429 },
    mapTypeId: "terrain",
  });
  // Define the LatLng coordinates for the polygon's path.

  const triangleCoords = [
    { lat: 6657349.46245284, lng: 2900421.23798664 },
    { lat: 6657553.91915352, lng: 2900421.23798664 },
    { lat: 6657553.91915352, lng: 2901021.04372987 },
    { lat: 6657349.46245284, lng: 2901021.04372987 },
    { lat: 6657349.46245284, lng: 2900421.23798664 },
  ];
  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  bermudaTriangle.setMap(map);
}

window.initMap = initMap;
