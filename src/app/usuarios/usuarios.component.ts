import { Component, OnInit } from '@angular/core';
import { FaConfig } from '@fortawesome/angular-fontawesome/config';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { usuario} from '../model/model.module';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  faEdit=faEdit
  faTrash=faTrash
  list:Array<any> =[];
  nombre:String='';
  formaddUsuario = this.formbuilder.group({
    nombre: '',
    correo: '',
    password:'',
    rol: 'ADMIN_ROLE',
  })

  formEditUsuario = this.formbuilder.group({
    nombre: '',
    correo: '',
    password:'',
    rol: 'ADMIN_ROLE',
    id:'',
    contrasena:''
  })

  constructor(private router:Router, 
    private ApiService:ApiService, 
    private spinner: NgxSpinnerService,
    private formbuilder:FormBuilder ){}
  
    
  ngOnInit(): void {
    
    this.getUser()
    this.nombre= JSON.parse(sessionStorage.getItem('usuario')!).nombre
  }
  getUser(){
    this.spinner.show()
    this.ApiService.getUsuarios().subscribe(
      (data:any )=>{
        if(data.usuarios.length>0){
          this.list=data.usuarios
        }
        this.spinner.hide()
      },
      (erro)=>{
        console.log('error ', erro)
        this.spinner.hide()
      }
    )
  }

  SignOut(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('usuario')
    this.router.navigate([''])

  }
  eliminar(uid:string){
    this.spinner.show()
    this.ApiService.DeleteUsuario(uid).subscribe(
      (res:any)=>{
          alert("Usuario Eliminada correctamente")
          this.getUser()
          this.spinner.hide()
      },
      (Erro:String)=>{
        console.log("Error ", Erro)
        this.spinner.hide()
      }

    )

  }
  editar(usuario:any){
    this.formEditUsuario.value.nombre = usuario.nombre!;
    this.formEditUsuario.value.correo = usuario.correo!;
    this.formEditUsuario.value.id = usuario.uid!;
    this.formEditUsuario.value.contrasena = ''
  }
  
  updateUsuario(){
    this.spinner.show()
    var ui = this.formEditUsuario.value.id
    var body ={
      nombre:this.formEditUsuario.value.nombre,
      correo:this.formEditUsuario.value.correo,
      password:this.formEditUsuario.value.contrasena,
      rol:this.formEditUsuario.value.rol
    }
    this.ApiService.UpdateUsuario(ui!, body).subscribe(
      (res:any)=>{
        alert("Usuario Actualizado correctamente")
        this.spinner.hide()
        window.location.reload();
      },
      (Error:any)=>{
        console.error(Error)
        this.spinner.hide()
      }
    )
  }
  AddUsuario(){
    this.spinner.show()
    var mail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    var email =this.formaddUsuario.value.correo!
    if(this.formaddUsuario.value.password?.length!>6 ){

      if(email.match(mail)){
        
        this.ApiService.AddUsuario(this.formaddUsuario.value).subscribe( 
          (repo:any )=>{
            alert("Usuario "+ repo.usuario.nombre +" creado correctamente")
            this.spinner.hide()
            this.getUser()
          },
          (Error:any)=>{
            this.spinner.hide()
            alert(Error.error.errors[0].msg)
            console.log(Error)
          }
          )
          
        }else{
          
          alert("Correo no Valido")
          this.spinner.hide()
        }
    }else{
      alert("El password debe de ser más de 6 letras")
      this.spinner.hide()
    }
  }
      
}
