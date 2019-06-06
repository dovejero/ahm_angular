import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGralComponent } from './formularios/form-gral/form-gral.component';
import { GralBandasComponent } from './bandas/gral-bandas/gral-bandas.component';
import { GralSalasComponent } from './salas/gral-salas/gral-salas.component';
import { GralEventosComponent } from './eventos/gral-eventos/gral-eventos.component';
import { FormRegistroComponent } from './formularios/form-registro/form-registro.component';
import { FormLoginComponent } from './formularios/form-login/form-login.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { ListaSalasComponent } from './salas/lista-salas/lista-salas.component';
import { ListaBandasComponent } from './bandas/lista-bandas/lista-bandas.component';
import { caEventos } from './canActivate/caEventos';

const routes: Routes = [
  {
    path: 'bandas', component: GralBandasComponent,
  },
  {
    path: 'bandas/:id', component: GralBandasComponent,
    children: [
      { path: '', component: ListaBandasComponent }
    ]
  },
  {
    path: 'salas', component: GralSalasComponent
  },
  {
    path: 'salas/:id', component: GralSalasComponent,
    children: [
      { path: '', component: ListaSalasComponent }
    ]
  },
  {
    path: 'eventos', component: GralEventosComponent
  },
  {
    path: 'eventos/:id', component: GralEventosComponent,
    children: [
      { path: '', component: ListaEventosComponent },
    ]
  },
  { path: 'login', redirectTo: '/eventos(modal:formIn/login)' },

  {
    path: "formIn",
    component: FormGralComponent,
    outlet: "modal",
    children: [
      { path: 'login', component: FormLoginComponent },
      { path: 'registro', component: FormRegistroComponent }
    ]
  },
  { path: '**', redirectTo: "/eventos" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
