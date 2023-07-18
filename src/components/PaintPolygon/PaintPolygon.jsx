import * as data from "./data.json";

function PaintPolygon() {
  const coordinatesData = { ...data };

  let map;
  let infoWindow;
  map = new window.google.maps.Map(document.getElementById("root"), {
    zoom: 14,
    center: { lat: 50.230162167569, lng: 25.6040670020666 },
    mapTypeId: "terrain",
  });

  function parseCoordynates(coords) {
    //incoming:
    //"25.6034633260487 50.2306264883756,25.6050533441016 50.229583484804,25.604950037844 50.2294886651663,25.6034049355553 50.2304856985917,25.6034633260487 50.2306264883756",
    //outcoming:
    /*  [
      { lat: 50.2306264883756, lng: 25.6034633260487 },
      { lat: 50.229583484804, lng: 25.6050533441016 },
      { lat: 50.2294886651663, lng: 25.604950037844 },
      { lat: 50.2304856985917, lng: 25.6034049355553 },
      { lat: 50.2306264883756, lng: 25.6034633260487 },
    ]; 
*/
    const coordsArray = coords.split(",");
    let invertedCoordsArray = coordsArray.map((item) => ({
      lat: +item.split(" ")[1],
      lng: +item.split(" ")[0],
    }));

    return invertedCoordsArray;
  }

  const setNewPolygonByCoords = (data, color) => {
    const parsedCoords = parseCoordynates(data);
    // console.log(parsedCoords);
    const newPolygon = new window.google.maps.Polygon({
      paths: parsedCoords,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: color,
      fillOpacity: 0.35,
    });
    return newPolygon;
  };

  // setNewPolygonByCoords(coordinatesData["0"]);
  // console.log(typeof coordinatesData);
  for (let i = 0; i < Object.keys(coordinatesData).length - 1; i++) {
    const newPolygonObject = setNewPolygonByCoords(
      coordinatesData[`${i.toString()}`],
      "#" +
        (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
    newPolygonObject.setMap(map);
    newPolygonObject.addListener("click", (event) =>
      showArrays(event, newPolygonObject, "ДІЛЯНКА Номер " + i)
    );
  }
  // const photo = document.createElement("img");
  // photo.src = "./marker.png";
  // photo.style = { width: "24px" };
  // console.log("photo", photo);

  const marker = new window.google.maps.Marker({
    position: { lat: 50.230162167569, lng: 25.6040670020666 },
    // icon: "./marker.png",
    map: map,
  });

  infoWindow = new window.google.maps.InfoWindow();

  //   function getCenterOfPolygon(polygon) {
  //     var PI = 22 / 7;
  //     var X = 0;
  //     var Y = 0;
  //     var Z = 0;
  //     polygon.getPath().forEach(function (vertex, inex) {
  //       let lat1 = vertex.lat();

  //       let lon1 = vertex.lng();
  //       lat1 = (lat1 * PI) / 180;
  //       lon1 = (lon1 * PI) / 180;
  //       X += Math.cos(lat1) * Math.cos(lon1);
  //       Y += Math.cos(lat1) * Math.sin(lon1);
  //       Z += Math.sin(lat1);
  //     });
  //     let Lon = Math.atan2(Y, X);
  //     let Hyp = Math.sqrt(X * X + Y * Y);
  //     let Lat = Math.atan2(Z, Hyp);
  //     Lat = (Lat * 180) / PI;
  //     Lon = (Lon * 180) / PI;

  //     return new window.google.maps.LatLng(Lat, Lon);
  //   }

  function showArrays(event, polygon, name) {
    // Since this polygon has only one path, we can call getPath() to return the
    // MVCArray of LatLngs.
    // @ts-ignore

    // const polygon = this;
    // console.log(this);

    const vertices = polygon.getPath();
    let contentString =
      "<b>" +
      name +
      "</b><br><br>" +
      "ЇЇ координати: <br>" +
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
  return <></>;
}

export default PaintPolygon;
