import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { UsuarioCardComponent } from './components/usuario-card/usuario-card.component';
import { NotificacionPipe } from './pipes/notificacion.pipe';

@NgModule({
  declarations: [AgregarComponent, ListadoComponent, PrincipalComponent, UsuarioCardComponent, NotificacionPipe],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class UsuariosModule { }
