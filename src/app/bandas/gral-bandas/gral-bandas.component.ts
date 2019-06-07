import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BandasService } from '../../servicios/bandas.service'
@Component({
  selector: 'app-gral-bandas',
  templateUrl: './gral-bandas.component.html',
  styleUrls: ['./gral-bandas.component.css']
})
export class GralBandasComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id == undefined) {
        this.bandasService.getRandomId().then((res) => {
          let idRandom = res['id']
          this.router.navigate([`/bandas/${idRandom}`]);
        }).catch((err) => {
          this.router.navigate([`/bandas/1`]);
        });
      }

    })
  }
}
