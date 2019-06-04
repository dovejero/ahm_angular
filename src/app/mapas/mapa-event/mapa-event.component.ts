import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';

declare var google;

@Component({
  selector: 'app-mapa-event',
  templateUrl: './mapa-event.component.html',
  styleUrls: ['./mapa-event.component.css']
})
export class MapaEventComponent implements OnInit {

  @ViewChild('googleMap') divMap: any;
  @Input() localizacion: any;
  map: any;
  markers: any[];

  constructor() {
    this.markers = [];
  }

  ngOnInit() {
    this.showPosition(this.localizacion);
  }

  showPosition(position) {
    console.log('POSICION', position[0]);
    console.log(navigator);
    console.log(this.divMap)


    let propsMap = {
      center: new google.maps.LatLng(position[0].Latitud, position[0].Longitud),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }


    this.map = new google.maps.Map(this.divMap.nativeElement, propsMap)
    var infowindow = new google.maps.InfoWindow();

    for (let i = 0; i < position.length; i++) {
      var data = position[i];

      var myLatlng = new google.maps.LatLng(data.Latitud, data.Longitud);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
      });

      (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
          infowindow.setContent(`<div class="card"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${data.poblacion}</h5><p class="card-text">lat ${data.Latitud}  Lng: ${data.Longitud} </p><a _ngcontent-sdw-c1="" class="btn btn-primary" ng-reflect-router-link="/eventos" href="/eventos"> Eventos </a></div></div>`);
          infowindow.open(this.map, marker);
        });
      })(marker, data);

      this.markers.push(marker);

    }

  }

  showError(error) {
    console.log('ERROR:', error)
    // error.PERMISSION_DENIED
    // error.POSITION_UNAVAILABLE
    // error.TIMEOUT
    // error.UNKNOWN_ERROR
  }

}
