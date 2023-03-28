import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../servicios/api.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  faEdit=faEdit
  faTrash=faTrash
  
  list:Array<any> =[];
  listCategoria:Array<any> =[];
  nombre:String='';
  formaddProducto = this.formbuilder.group({
    nombre: '',
    categoria:''
  })

  formEditProducto = this.formbuilder.group({
    nombre:'',
    categoria:'',
    uid:''
  })

  constructor(private router:Router,
    private ApiService:ApiService,
    private spinner: NgxSpinnerService,
    private formbuilder:FormBuilder,  ){}
  ngOnInit(): void {
    
    this.getProductos();
    this.getCategorias();
    this.nombre= JSON.parse(sessionStorage.getItem('usuario')!).nombre
  }

  onSelected(value:any){
    console.log("value ", value )
    this.formaddProducto.value.categoria = value
  }

  onSelectedEdita(value:any){
    console.log("value 2", value )
    this.formEditProducto.value.categoria = value
  }

  getCategorias(){
    this.spinner.show()
    this.ApiService.getCategorias().subscribe(

      (data:any )=>{
        if(data.categorias.length>0){
            this.listCategoria=data.categorias
          }
          this.spinner.hide()
      },
      (erro)=>{
        console.log('error ', erro)
        this.spinner.hide()
      }  
    )
  }

  getProductos(){
    this.spinner.show()
    this.ApiService.getProductos().subscribe(
      (data:any )=>{
        if(data.productos.length>0){
            this.list=data.productos
          }
          this.spinner.hide()
      },
      (erro)=>{
        console.log('error ', erro)
        this.spinner.hide()
      }  
    )

  }

  crearProducto(){
    this.spinner.show()
    var body ={
      nombre:this.formaddProducto.value.nombre,
      categoria:this.formaddProducto.value.categoria
    }
    if(this.formaddProducto.value.categoria){
      this.ApiService.AddProducto(body).subscribe(
        (res:any)=>{
          alert('Producto Agregada Correctamente')
          this.getProductos()
          this.spinner.hide()
        },
        (Error:any)=>{
          console.log("Error ", Error)
          alert(Error.error.msg)
          this.spinner.hide()
        }
  
      )
    }else{
      alert('Debe ingresar Categoria')
      this.spinner.hide()
    }
  }
  updateProducto(){
    this.spinner.show()
    var ui = this.formEditProducto.value.uid
    var body ={
      nombre:this.formEditProducto.value.nombre,
      categoria:this.formEditProducto.value.categoria,
    }
    this.ApiService.UpdateProducto(ui!, body).subscribe(
      (res:any)=>{
        alert("Producto Actualizado correctamente")
        this.spinner.hide()
        window.location.reload();
      },
      (Error:any)=>{
        console.error(Error)
        this.spinner.hide();
      }
    )
  }
  edit(usuario:any){
    this.formEditProducto.value.uid= usuario._id
    this.formEditProducto.value.nombre = usuario.nombre!;
    this.formEditProducto.value.categoria = usuario.correo!;    
  }
  eliminar(uid:any){
    this.spinner.show()
    this.ApiService.DeleteProducto(uid).subscribe(
      (res:any)=>{
          alert("producto Eliminada correctamente")
          this.getProductos()
          this.spinner.hide()
      },
      (Erro:String)=>{
        console.log("Error ", Erro)
        this.spinner.hide()
      }

    )

  }
  SignOut(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('usuario')
    this.router.navigate([''])

  }
}
