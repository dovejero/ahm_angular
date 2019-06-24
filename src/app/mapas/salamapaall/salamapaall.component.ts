import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SalasService } from '../../servicios/salas.service';


declare var google;

@Component({
  selector: 'app-salamapaall',
  templateUrl: './salamapaall.component.html',
  styleUrls: ['./salamapaall.component.css']
})
export class SalamapaallComponent implements OnInit {

  @ViewChild('googleMap') divMap: any;
  @Input() localizacion: any;
  map: any;
  markers: any[];

  constructor(private router: Router, private salasService: SalasService) {
    this.markers = [];
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError)
    } else {
      console.log('Navegador inválido con Geolocalización')
    }
    // this.showPosition(this.localizacion);
  }

  showPosition(position) {

    let propsMap = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }


    this.map = new google.maps.Map(this.divMap.nativeElement, propsMap)
    var infowindow = new google.maps.InfoWindow();
    for (let i = 0; i < this.localizacion.length; i++) {
      var data = this.localizacion[i];

      var myLatlng = new google.maps.LatLng(data.lat, data.lng);

      let input = document.getElementById('inputPlace');
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.setFields(['address_components', 'geometry', 'icon', 'name'])

      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace()
        this.map.setCenter(place.geometry.location)
      })

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
      });

      (function (marker, data, pThis) {
        google.maps.event.addListener(marker, "click", function (e) {
          infowindow.setContent(`<div class="card"><div class="card-body"><h5 class="card-title">${data.nombre}</h5><p class="card-text">${data.localizacion}</p><button id="clickableItem">Ver</button>`);
          infowindow.open(this.map, marker);

          google.maps.event.addListener(infowindow, 'domready', () => {
            var clickableItem = document.getElementById('clickableItem');
            clickableItem.addEventListener('click', () => {
              pThis.router.navigate(['/salas/' + data.id]);
              console.log(data.poblacion)
            });
          });
        });
      })(marker, data, this);

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