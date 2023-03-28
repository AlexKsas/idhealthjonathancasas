import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CategoriasComponent } from './categorias/categorias.component';
import { PermissionsGuard } from './guards/permissions.guard';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'usuarios', component: UsuariosComponent, canActivate:[PermissionsGuard]},
  {path:'productos', component: ProductosComponent, canActivate:[PermissionsGuard] },
  {path:'categorias', component: CategoriasComponent, canActivate:[PermissionsGuard] },
  {path:'**', component: HomeComponent},
]; 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
