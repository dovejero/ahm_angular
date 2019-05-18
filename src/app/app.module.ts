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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormBandaComponent,
    FormSalaComponent,
    FormGralComponent,
    FormLoginComponent,
    FormRecuComponent
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
