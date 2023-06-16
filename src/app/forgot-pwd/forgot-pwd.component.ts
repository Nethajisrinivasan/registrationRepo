import { Component } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent {
email:any={};

  constructor(private signup:SignupService, private rout:Router) { }
  sendotp(value:any){
    console.log("email is ",value);
    localStorage.setItem('user', JSON.stringify(value));

    this.email=value;
    this.signup.sendotp(this.email).subscribe((result:any)=>{
      console.log(result);
     
      if(result.message=="A verification code has been sent to your email"){
      this.rout.navigate(['resetpwdverification']);
     }

    }
    )
  }
}
