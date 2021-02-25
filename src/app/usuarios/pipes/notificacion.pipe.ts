import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuarios.interface';

@Pipe({
  name: 'notificacion'
})
export class NotificacionPipe implements PipeTransform {

  transform(usuarios: Usuario): string {
    return (usuarios.notificaciones)?'Sí':'No';
  }

}
