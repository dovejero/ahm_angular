import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './gral/header/header.component';
import { FooterComponent } from './gral/footer/footer.component';
import { FormBandaComponent } from './formularios/form-banda/form-banda.component';
import { FormSalaComponent } from './formularios/form-sala/form-sala.component';
import { FormGralComponent } from './formularios/form-gral/form-gral.component';
import { FormLoginComponent } from './formularios/form-login/form-login.component';
import { FormRecuComponent } from './formularios/form-recu/form-recu.component';
import { HeroeSalasComponent } from './salas/heroe-salas/heroe-salas.component';
import { FiltroSalasComponent } from './salas/filtro-salas/filtro-salas.component';
import { MapaSalasComponent } from './salas/mapa-salas/mapa-salas.component';
import { ListaSalasComponent } from './salas/lista-salas/lista-salas.component';
import { FichaSalasComponent } from './salas/ficha-salas/ficha-salas.component';
import { HeroeBandasComponent } from './bandas/heroe-bandas/heroe-bandas.component';
import { FiltroBandasComponent } from './bandas/filtro-bandas/filtro-bandas.component';
import { ListaBandasComponent } from './bandas/lista-bandas/lista-bandas.component';
import { FichaBandasComponent } from './bandas/ficha-bandas/ficha-bandas.component';
import { HeroeEventosComponent } from './eventos/heroe-eventos/heroe-eventos.component';
import { FichaEventosComponent } from './eventos/ficha-eventos/ficha-eventos.component';
import { CalendarioEventosComponent } from './eventos/calendario-eventos/calendario-eventos.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { MapaEventosComponent } from './eventos/mapa-eventos/mapa-eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormBandaComponent,
    FormSalaComponent,
    FormGralComponent,
    FormLoginComponent,
    FormRecuComponent,
    HeroeSalasComponent,
    FiltroSalasComponent,
    MapaSalasComponent,
    ListaSalasComponent,
    FichaSalasComponent,
    HeroeBandasComponent,
    FiltroBandasComponent,
    ListaBandasComponent,
    FichaBandasComponent,
    HeroeEventosComponent,
    FichaEventosComponent,
    CalendarioEventosComponent,
    ListaEventosComponent,
    MapaEventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
