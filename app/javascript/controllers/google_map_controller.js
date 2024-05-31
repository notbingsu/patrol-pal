import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="google-map"
export default class extends Controller {
  static targets = [
    "myMap",
    "lat",
    "lng",
    "locationName",
  ];

  connect() {
    let lat = 34.87;
    let lng = -111.82;

    //this.latTarget.value = lat
    //this.lngTarget.value = lng
    this.initMap(lat, lng);
  }

  async initMap(lat, lng) {
    // The location of Uluru
    const position = { lat: lat, lng: lng };
    let mapId = this.myMapTarget;

    const { Map } =
      await google.maps.importLibrary("maps");
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let map = new Map(mapId, {
      center: position,
      zoom: 10,
      mapId: mapId,
    });

    // The marker, positioned at Uluru
    // const marker = new AdvancedMarkerElement({
    //   map: map,
    //   position: position,
    //   title: "Uluru",
    // });

    this.addSingleMarker(position, map);
    // this.addMultipleMarker(map)
  }

  addSingleMarker(position, map) {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `This is single marker`,
      label: `1`,
    });

    marker.setAnimation(
      google.maps.Animation.BOUNCE
    ); //bouncing animation of marker
  }

  updateCordinate() {
    if (
      (event.currentTarget.dataset.googleMapTarget =
        "lat")
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
