import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = [
    "myMap",
    "lat",
    "lng",
    "locationName",
  ];

  markersArray = [];

  async connect() {
    this.initMap();
  }

  async initMap() {
    const response = await fetch(
      "/locations.json"
    );
    const data = await response.json();
    const polylineResponse = await fetch(
      "/polylines.json"
    );
    const polylineData =
      await polylineResponse.json();
    // Assume polylineData[0].encoding is the correct field
    var encoded_path = polylineData[0].encoding;
    console.log(encoded_path);
    if (typeof encoded_path !== "string") {
      throw new Error(
        "Encoded polyline is not a string"
      );
    }
    this.clearMarkers();
    let lat, lng;
    const { Map } =
      await google.maps.importLibrary("maps");
    var decoded_path =
      google.maps.geometry.encoding.decodePath(
        encoded_path
      );
    if (data && data.length > 0) {
      lat = data[0].ltd;
      lng = data[0].lng;
    } else {
      lat = 37.769;
      lng = -122.446;
    }
    const position = { lat, lng };
    let mapId = this.myMapTarget;
    let map = new Map(mapId, {
      center: position,
      zoom: 15,
    });
    // var encoded_path = polyline;
    var setRegion = new google.maps.Polyline({
      path: decoded_path,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map,
    });
    setRegion.setMap(map);

    // Clear existing markers

    // Add new markers
    if (data) {
      this.addMarkers(data, map);
    }
  }

  addMarkers(data, map) {
    for (let i = 0; i < data.length; i++) {
      this.addSingleMarker(
        {
          lat: data[i].ltd,
          lng: data[i].lng,
        },
        map,
        i + 1
      );
    }
  }

  addSingleMarker(position, map, index) {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `This is marker ${index}`,
      label: `${index}`,
    });
    this.markersArray.push(marker);
  }

  clearMarkers() {
    this.markersArray.forEach((marker) =>
      marker.setMap(null)
    );
    this.markersArray = [];
  }

  decodeLevels(encodedLevelsString) {
    var decodedLevels = [];
    for (
      var i = 0;
      i < encodedLevelsString.length;
      ++i
    ) {
      var level =
        encodedLevelsString.charCodeAt(i) - 63;
      decodedLevels.push(level);
    }
    return decodedLevels;
  }

  updateCordinate(event) {
    if (
      event.currentTarget.dataset
        .googleMapTarget === "lat"
    ) {
      this.initMap(
        parseFloat(event.currentTarget.value),
        parseFloat(this.lngTarget.value)
      );
    } else {
      this.initMap(
        parseFloat(this.latTarget.value),
        parseFloat(event.currentTarget.value)
      );
    }
  }
}
