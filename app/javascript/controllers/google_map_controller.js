import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "myMap",
    "lat",
    "lng",
    "locationName",
  ];

  async connect() {
    const response = await fetch(
      "/locations.json"
    );
    const data = await response.json();
    //this.latTarget.value = lat
    //this.lngTarget.value = lng
    // let lat = 1.424407006907169;
    // let lng = 103.84098276837128;
    this.initMap(data);
  }

  async initMap(data) {
    // The location of Uluru
    let lat = data[0].ltd;
    let lng = data[0].lng;
    const position = { lat, lng };
    let mapId = this.myMapTarget;

    const { Map } =
      await google.maps.importLibrary("maps");
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let map = new Map(mapId, {
      center: position,
      zoom: 15,
      mapId: mapId,
    });

    // The marker, positioned at Uluru
    // const marker = new AdvancedMarkerElement({
    //   map: map,
    //   position: position,
    //   title: "Uluru",
    // });

    for (let i = 1; i <= data.length; i++) {
      this.addSingleMarker(
        {
          lat: data[i].ltd,
          lng: data[i].lng,
        },
        map,
        i
      );
    }
    // this.addMultipleMarker(map)
  }

  addSingleMarker(position, map, index) {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `This is single marker`,
      label: `${index}`,
    });
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
