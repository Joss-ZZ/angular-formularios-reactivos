import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  mostrarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:3000/usuarios');
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:3000/usuarios', usuario);
  }

  buscarUsuarioPorID(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:3000/usuarios/${id}`);
  }

  editarUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`http://localhost:3000/usuarios/${id}`, usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/usuarios/${id}`);
  }

}
