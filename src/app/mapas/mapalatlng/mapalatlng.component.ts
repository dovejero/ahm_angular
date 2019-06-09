import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
declare var google;

@Component({
  selector: 'app-mapalatlng',
  templateUrl: './mapalatlng.component.html',
  styleUrls: ['./mapalatlng.component.css']
})
export class MapalatlngComponent implements OnInit {
  @ViewChild('googleMap') divMap: any;
  map: any;
  markers: any[];
  localizacion: any;
  @Output() latlng = new EventEmitter();


  constructor() {
    this.markers = [];
    this.localizacion = {};
  }
  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError)
    } else {
      console.log('Navegador inválido con Geolocalización')
    }
  }
  showPosition(position) {
    console.log(position);
    console.log(navigator);
    console.log(this.divMap)

    let propsMap = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }

    this.map = new google.maps.Map(this.divMap.nativeElement, propsMap)

    let marker = new google.maps.Marker({
      position: propsMap.center,
      map: this.map,
      title: '!!Estamos aquí',
      animation: google.maps.Animation.DROP
    })
    this.markers.push(marker);
    let input = document.getElementById('inputPlace');
    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name'])

    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace()

      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: this.map
      })
      this.map.setCenter(place.geometry.location)
      this.markers = place.geometry.location;
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      console.log('LATLNG: ', lat, lng)
      this.localizacion = { lat: lat, lng: lng };
      this.latlng.emit(this.localizacion);
    })
  }
  showError(error) {
    console.log('ERROR:', error)
    // error.PERMISSION_DENIED
    // error.POSITION_UNAVAILABLE
    // error.TIMEOUT
    // error.UNKNOWN_ERROR
  }

  eliminarMarkers() {
    this.markers.map(marker => marker.setMap())
    this.markers = []
  }
}