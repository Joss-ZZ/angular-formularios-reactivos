
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      button {
        margin-left: 1em;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private usuariosService:UsuariosService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    genero: ['M', Validators.required],
    notificaciones: [false, Validators.required],
    favoritas: this.fb.array([]),
    terminos: [false, Validators.requiredTrue]
  })

  usuario: Usuario = {
    nombre: '',
    genero: 'M',
    notificaciones: false,
    favoritas: []
  }

  idUser!: number;
  terminos: boolean = false;

  ngOnInit(): void {
    this.Principal();
  }

/////////////////////////////////////////////////////////////

  peticionServidor(){
    return new Promise(resolve=>{
      if(this.router.url.includes('editar')){
        this.activatedRoute.params.pipe(
          switchMap(({id})=> this.usuariosService.buscarUsuarioPorID(id)) 
        ).subscribe(({id, ...rest})=> {
          this.terminos = true;
          this.idUser = id;
          this.usuario = rest; 
          resolve('Hecho');        
        });
      }
    })
  }

  async Principal(){

    if(this.router.url.includes('editar')){
      await this.peticionServidor();
    }

    for(let i=0; i<this.usuario.favoritas.length;i++){
      this.arrayFavoritas.push(this.fb.control(this.usuario.favoritas[i],Validators.required));
    }
    this.miFormulario.reset({
      ...this.usuario,
      terminos: this.terminos
    });

    this.miFormulario.valueChanges.subscribe(({terminos, ...restoDeArgumentos}) => {
      this.usuario = restoDeArgumentos;
    })

  }

//////////////////////////////////////////////////////////////

  nuevoControl: FormControl = this.fb.control('', Validators.required);

  get arrayFavoritas(){
    return this.miFormulario.get('favoritas') as FormArray;
  }


  campoInvalido(campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  mostrarSnackBar(texto: string){
    this.snackBar.open(texto, 'Ok', {
      duration: 3000
    });
  }

  enviarFormulario(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      console.log('Por favor llene todos los campos');
      return;
    }

    if(this.idUser){
      //Editar
      this.usuariosService.editarUsuario(this.idUser.toString(), this.usuario)
        .subscribe(persona=>{
          this.mostrarSnackBar('Actualizado conrrectamente!'),
          this.router.navigate(['/usuarios']);
        });
        return;
    }else{
      //Agregar
      this.usuariosService.agregarUsuario(this.usuario)
       .subscribe(persona=>{
         this.mostrarSnackBar('Registrado conrrectamente!'),
         this.router.navigate(['/usuarios']);
        });
       return;
    }
  }

  eliminarUsuario(){
    this.usuariosService.eliminarUsuario(this.idUser.toString())
      .subscribe(resp=>{
        this.mostrarSnackBar('Eliminado correctamente!'),
        this.router.navigate(['/usuarios']);
      });
  }

  eliminarPelicula(index: number){
    this.arrayFavoritas.removeAt(index);
  }

  agregarPelicula(){
    if(this.nuevoControl.invalid){
      return;
    }

    this.arrayFavoritas.push(this.fb.control(this.nuevoControl.value, Validators.required));
    this.nuevoControl.reset();
  }
}
