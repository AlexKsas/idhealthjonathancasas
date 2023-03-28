import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class usuario  { 
    nombre?: String
    correo?: String
    rol?: String
  }

  export class addUsuario  { 
    nombre?: String
    correo?: String
    password?:String
    rol?: String
  }