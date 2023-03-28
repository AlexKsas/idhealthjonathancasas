import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  constructor( private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
     ): boolean  {

    if(this.Logged()){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
  Logged():boolean{
    const token = sessionStorage.getItem('token')
    const usu = sessionStorage.getItem('usuario')
    if( token && usu ){
      return true;
    }else{
      return false;
    }
  }
  
}
