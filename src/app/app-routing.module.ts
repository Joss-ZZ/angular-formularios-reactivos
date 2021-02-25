import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path: 'home',
    loadChildren: ()=> import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'usuarios',
    loadChildren: ()=> import('./usuarios/usuarios.module').then(m=>m.UsuariosModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
