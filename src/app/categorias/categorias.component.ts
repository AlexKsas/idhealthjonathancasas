import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../servicios/api.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{
  faEdit=faEdit
  faTrash=faTrash
  list:Array<any> =[];
  nombre:String='';
  formAddCategoria = this.formbuilder.group({
    nombre: '',
  })
  formEditCategoria=this.formbuilder.group({
    nombre:'',
    uid:''
  })

  constructor( private router:Router,
    private ApiService:ApiService,
    private spinner: NgxSpinnerService,
    private formbuilder:FormBuilder 
    ){}

  ngOnInit(): void {
    this.getCategorias()
    this.nombre= JSON.parse(sessionStorage.getItem('usuario')!).nombre
    
  }
  getCategorias(){
    this.spinner.show()
    this.ApiService.getCategorias().subscribe(
      (data:any )=>{
        if(data.categorias.length>0){
            this.list=data.categorias
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
  crearCategoria(){
    this.spinner.show()
    var body ={
      nombre:this.formAddCategoria.value.nombre
    }
    this.ApiService.AddCategoria(body).subscribe(
      (res:any)=>{
        alert('Categoria Agregada Correctamente')
        this.getCategorias()
        this.spinner.hide()
      },
      (Error:any)=>{
        console.log("Error ", Error)
        alert(Error.error.msg)
        this.spinner.hide()
      }

    )
  }
  edit(categoria:any){
    this.formEditCategoria.value.nombre = categoria.nombre;
    this.formEditCategoria.value.uid = categoria._id
  }
  updateCategoria(){
  this.spinner.show()
    var ui = this.formEditCategoria.value.uid
    var body ={
      nombre:this.formEditCategoria.value.nombre,
    }
    this.ApiService.UpdateCategoria(ui!, body).subscribe(
      (res:any)=>{
        
        alert("Categoria Actualizado correctamente")
        this.spinner.hide()
        window.location.reload(); 
      },
      (Error:any)=>{
        console.error(Error)
        this.spinner.hide()
      }
    )

  }

  DeleteCategoria(uid:string){
    this.spinner.show()
    this.ApiService.DeleteCategoria(uid).subscribe(
      (res:any)=>{
          alert("Categoria Eliminada correctamente")
          this.getCategorias()
          this.spinner.hide()
      },
      (Erro:String)=>{
        console.log("Error ", Erro)
        this.spinner.hide()
      }

    )
  }

}
