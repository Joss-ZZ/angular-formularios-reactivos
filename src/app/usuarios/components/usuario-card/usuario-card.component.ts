import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuario-card',
  templateUrl: './usuario-card.component.html',
  styleUrls: ['./usuario-card.component.css']
})
export class UsuarioCardComponent implements OnInit {

  @Input() usuario!: Usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
