import { FormControl } from "@angular/forms";

export interface Usuario {
    id?: number,
    nombre: string,
    genero: string,
    notificaciones: boolean,
    favoritas: string[]
}