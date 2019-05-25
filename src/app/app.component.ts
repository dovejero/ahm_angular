import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idioma = 'es';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.idioma);
    this.translateService.use(this.idioma);
  }

  cambiarIdioma(lang: string) {
    this.translateService.use(lang);
  }
}
