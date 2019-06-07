import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';


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

  constructor(private router: Router, private eventosService: EventosService) {
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

      (function (marker, data, pThis) {
        google.maps.event.addListener(marker, "click", function (e) {
          infowindow.setContent(`<div class="card"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${data.poblacion}</h5><p class="card-text">lat ${data.Latitud}  Lng: ${data.Longitud} </p><button id="clickableItem">Click me</button>`);
          infowindow.open(this.map, marker);

          google.maps.event.addListener(infowindow, 'domready', () => {
            var clickableItem = document.getElementById('clickableItem');
            clickableItem.addEventListener('click', () => {
              pThis.prueba(data)
              // pThis.router.navigate(['/'+data.poblacion]);
              console.log(data.poblacion)
            });
          });
        });
      })(marker, data, this);

      this.markers.push(marker);

    }

  }

  prueba(val) {
    console.log('VAL: ', val)
  }

  showError(error) {
    console.log('ERROR:', error)
    // error.PERMISSION_DENIED
    // error.POSITION_UNAVAILABLE
    // error.TIMEOUT
    // error.UNKNOWN_ERROR
  }

}
