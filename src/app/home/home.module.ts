import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { BienvenidoComponent } from './bienvenido/bienvenido.component';



@NgModule({
  declarations: [BienvenidoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
