import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGralComponent } from './formularios/form-gral/form-gral.component';
import { GralBandasComponent } from './bandas/gral-bandas/gral-bandas.component';
import { GralSalasComponent } from './salas/gral-salas/gral-salas.component';
import { GralEventosComponent } from './eventos/gral-eventos/gral-eventos.component';

const routes: Routes = [
  { path: 'bandas', component: GralBandasComponent },
  { path: 'salas', component: GralSalasComponent },
  { path: 'eventos', component: GralEventosComponent },
  { path: 'registro', redirectTo: '/eventos(loginAux:login)' },
  {
    path: "login",
    component: FormGralComponent,
    outlet: "loginAux"
  },
  { path: '**', redirectTo: "/eventos" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
