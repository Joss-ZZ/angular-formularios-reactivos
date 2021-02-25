import { Component } from '@angular/core';
import { Menu } from './interfaces/menu.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent{

  constructor() { }

  menuPrincipal: Menu[] = [
    {
      texto: 'Lista de usuarios',
      ruta: './listado'
    },
    {
      texto: 'Agregar nuevo',
      ruta: './agregar'
    }
  ]

}
