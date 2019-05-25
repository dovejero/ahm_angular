import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  // idioma = 'es';

  constructor(private translateService: TranslateService) {
    // this.translateService.setDefaultLang(this.idioma);
    // this.translateService.use(this.idioma);
  }

  // cambiarIdioma(lang: string) {
  //   this.translateService.use(lang);
  // }
}
