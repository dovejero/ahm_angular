import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';

declare var google;

@Component({
  selector: 'app-salamapa',
  templateUrl: './salamapa.component.html',
  styleUrls: ['./salamapa.component.css']
})
export class SalamapaComponent implements OnInit {

  @ViewChild('googleMap') divMap: any;
  @Input() localizacion: any;
  map: any;
  markers: any[];

  constructor() {
    this.markers = [];
  }

  ngOnInit() {
    this.showPosition
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if (propName == 'localizacion') {
        this.showPosition2()
      }

    }
  }

  showPosition() {


    let propsMap = {
      center: new google.maps.LatLng(this.localizacion.lat, this.localizacion.lng),
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
  showPosition2() {
    console.log('THISLOCATE: ', this.localizacion)
    let propsMap = {
      center: new google.maps.LatLng(this.localizacion.lat, this.localizacion.lng),
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