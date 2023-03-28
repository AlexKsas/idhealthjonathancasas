import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { faLightbulb, faLock, faEnvelope  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'Jonathan Casas';
  correo: any;
  message:any;
  classErro:any
  
  faLightbulb=faLightbulb
  faLock=faLock
  faEnvelope=faEnvelope

  formSign = this.formbuilder.group({
    uss:'',
    pss:''
  })
  
  constructor(private ApiService:ApiService, 
    private formbuilder:FormBuilder, 
    private spinner: NgxSpinnerService,
    private router: Router  ){
  }
  
  ngOnInit (){
    const token = sessionStorage.getItem('token')
    const usu = sessionStorage.getItem('usuario')
    if( token && usu ){
      this.router.navigate(['usuarios'])
    }
  }
  
  messageSet(messa:any){
    this.message = messa
    this.error(-1)
    setTimeout(() => {
      this.message = ""
      this.error(0)
    }, 6000);
  }
  
  error(classMss:any){
    switch (classMss) {
      case -1:
          this.classErro='alert alert-danger';
        break;
      case 0:
          this.classErro = "";
        break;
      default:
          this.classErro='alert alert-danger';
        break;
    }
  }
  Sigin(){
    this.spinner.show()
    const uss = this.formSign.value.uss!
    const pss = this.formSign.value.pss!
    var mail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(uss.match(mail)){
        const value = this.ApiService.login(uss, pss).subscribe(
          (res:any)=>{
            sessionStorage.setItem('token', JSON.stringify(res.token))
            sessionStorage.setItem('usuario', JSON.stringify(res.usuario))
            this.router.navigate(['/usuarios'])
            this.spinner.hide()
          },
          Error=>{
            this.messageSet(Error.error.msg)
            this.spinner.hide()
          }
        )
    }else{

      this.messageSet("Validar correo")
      this.error(-1)
      this.spinner.hide()
    }

  }
}
