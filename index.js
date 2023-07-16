/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example creates a simple polygon representing the Bermuda Triangle.
// When the user clicks on the polygon an info window opens, showing
// information about the polygon's coordinates.
let map;
let infoWindow;

function initMap() {
  // Define the LatLng coordinates for the polygon.
  const triangleCoords = [
    { lat: 50.2306264883756, lng: 25.6034633260487 },
    { lat: 50.229583484804, lng: 25.6050533441016 },
    { lat: 50.2294886651663, lng: 25.604950037844 },
    { lat: 50.2304856985917, lng: 25.6034049355553 },
    { lat: 50.2306264883756, lng: 25.6034633260487 },
  ];

  // const cordinates = [
  //   [
  //     { lat: 50.2306264883756, lng: 25.6034633260487 },
  //     { lat: 50.229583484804, lng: 25.6050533441016 },
  //     { lat: 50.2294886651663, lng: 25.604950037844 },
  //     { lat: 50.2304856985917, lng: 25.6034049355553 },
  //     { lat: 50.2306264883756, lng: 25.6034633260487 },
  //   ],
  //   [
  //     { lat: 50.2606339537049, lng: 25.6419246949383 },
  //     { lat: 50.2607114827423, lng: 25.6418258802571 },
  //     { lat: 50.261386267184, lng: 25.6431059795369 },
  //     { lat: 50.2613632959559, lng: 25.6431374205719 },
  //     { lat: 50.2613087392449, lng: 25.6432047942182 },
  //     { lat: 50.2606339537049, lng: 25.6419246949383 },
  //   ],
  // ];

  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: { lat: 50.230162167569, lng: 25.6040670020666 },
    mapTypeId: "terrain",
  });

  bermudaTriangle.setMap(map);

  // const photo = document.createElement("img");
  // photo.src = "./marker.png";
  // photo.style = { width: "24px" };
  // console.log("photo", photo);

  const marker = new google.maps.Marker({
    position: { lat: 50.230162167569, lng: 25.6040670020666 },
    // icon: "./marker.png",
    map: map,
  });
  // Add a listener for the click event.
  bermudaTriangle.addListener("click", showArrays);
  infoWindow = new google.maps.InfoWindow();
}

function getCenterOfPolygon(polygon) {
  var PI = 22 / 7;
  var X = 0;
  var Y = 0;
  var Z = 0;
  polygon.getPath().forEach(function (vertex, inex) {
    let lat1 = vertex.lat();

    let lon1 = vertex.lng();
    lat1 = (lat1 * PI) / 180;
    lon1 = (lon1 * PI) / 180;
    X += Math.cos(lat1) * Math.cos(lon1);
    Y += Math.cos(lat1) * Math.sin(lon1);
    Z += Math.sin(lat1);
  });
  let Lon = Math.atan2(Y, X);
  let Hyp = Math.sqrt(X * X + Y * Y);
  let Lat = Math.atan2(Z, Hyp);
  Lat = (Lat * 180) / PI;
  Lon = (Lon * 180) / PI;

  return new google.maps.LatLng(Lat, Lon);
}

function showArrays(event) {
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
  // @ts-ignore
  const polygon = this;

  const vertices = polygon.getPath();
  let contentString =
    "<b>Bermuda Triangle polygon</b><br>" +
    "Clicked location: <br>" +
    event.latLng.lat() +
    "," +
    event.latLng.lng() +
    "<br>";

  // Iterate over the vertices.
  for (let i = 0; i < vertices.getLength(); i++) {
    const xy = vertices.getAt(i);

    contentString +=
      "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
  }

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);
  infoWindow.open(map);
}

window.initMap = initMap;
