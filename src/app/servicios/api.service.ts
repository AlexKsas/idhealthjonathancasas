import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest  } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { 
  }
  private uri = environment.uri;
  private paginacion = '?desde=0&limite=20'
  
  public login(uss:String, pass:String ){
    var url =this.uri+ 'api/auth/login'
    const body={
      "correo":uss,
      "password":pass
    }
    const result =  this.http.post(url, body);
    return result;
  }
  
  public getUsuarios(){
    var url = this.uri + 'api/usuarios'+this.paginacion

    var header = new HttpHeaders();
    var token = JSON.stringify(sessionStorage.getItem('token'))
    
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('Accept', 'application/json');
    header.append('bearer Token', token);

    let opciones = {
      headers: header,
    
    }

    return this.http.get(url,opciones);
  }
  public AddUsuario(body:any){
    var url = this.uri + 'api/usuarios'
    return this.http.post(url,body);

  }
  public getProductos(){
    var url = this.uri + 'api/productos'+this.paginacion
    return this.http.get(url);
  }
  
  public getCategorias(){
    var url = this.uri + 'api/categorias'+this.paginacion
    return this.http.get(url);
  }

  public AddCategoria(body:any){
    var url = this.uri + 'api/categorias'
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.post(url, body, {headers: header} );

  }
  public AddProducto(body:any){
    var url = this.uri + 'api/productos'
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.post(url, body, {headers: header} );
  }

  public DeleteProducto(uid:String){
    var url = this.uri + 'api/productos/'+uid
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.delete(url,{headers: header} );
  }

  public DeleteCategoria(uid:String){
    var url = this.uri + 'api/categorias/'+uid
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.delete(url,{headers: header} );
  }

  public DeleteUsuario(uid:String){
    var url = this.uri + 'api/usuarios/'+uid
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.delete(url,{headers: header} );
  }

  public UpdateUsuario(uid:String, body:any){
    var url = this.uri + 'api/usuarios/'+uid
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.put(url,body,{headers: header} );
  }
  public UpdateProducto(uid:String, body:any){
    var url = this.uri + 'api/productos/'+uid
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.put(url,body,{headers: header} );
  }

  public UpdateCategoria(uid:String, body:any){
    var url = this.uri + 'api/categorias/'+uid
    var header = new HttpHeaders();
    let token =  sessionStorage.getItem('token')
    header = header.set('x-token' , token!.replaceAll('"',''));
    return this.http.put(url,body,{headers: header} );
  }
  
}

