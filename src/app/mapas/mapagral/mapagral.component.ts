import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';

declare var google;

@Component({
  selector: 'app-mapagral',
  templateUrl: './mapagral.component.html',
  styleUrls: ['./mapagral.component.css']
})
export class MapagralComponent implements OnInit {

  @ViewChild('googleMap') divMap: any;
  @Input() localizacion: any;
  map: any;
  markers: any[];

  constructor() {
    this.markers = [];
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError)
    } else {
      console.log('Navegador inválido con Geolocalización')
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if (propName == 'localizacion') {
        this.showPosition2(change.currentValue)
      }
      console.log('PROPNAME', change.currentValue);
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

  }
  showPosition2(position) {
    console.log(position);
    console.log(navigator);
    console.log(this.divMap)

    let propsMap = {
      center: new google.maps.LatLng(position.lat, position.lng),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }

    this.map = new google.maps.Map(this.divMap.nativeElement, propsMap)

    let marker = new google.maps.Marker({
      position: propsMap.center,
      map: this.map,
      animation: google.maps.Animation.DROP
    })
    this.markers.push(marker);

  }
  showError(error) {
    console.log('ERROR:', error)
    // error.PERMISSION_DENIED
    // error.POSITION_UNAVAILABLE
    // error.TIMEOUT
    // error.UNKNOWN_ERROR
  }
}
