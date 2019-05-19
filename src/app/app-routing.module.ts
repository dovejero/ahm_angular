import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGralComponent } from './formularios/form-gral/form-gral.component';
import { GralBandasComponent } from './bandas/gral-bandas/gral-bandas.component';
import { GralSalasComponent } from './salas/gral-salas/gral-salas.component';
import { GralEventosComponent } from './eventos/gral-eventos/gral-eventos.component';
import { FormRegistroComponent } from './formularios/form-registro/form-registro.component';
import { FormLoginComponent } from './formularios/form-login/form-login.component';

const routes: Routes = [
  { path: 'bandas', component: GralBandasComponent },
  { path: 'salas', component: GralSalasComponent },
  { path: 'eventos', component: GralEventosComponent },
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
