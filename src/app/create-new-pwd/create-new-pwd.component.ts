import { Component } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-pwd',
  templateUrl: './create-new-pwd.component.html',
  styleUrls: ['./create-new-pwd.component.scss']
})
export class CreateNewPwdComponent {
  password:string=''
  confirmpassword:string=''
  email:string=''
  constructor(private signup:SignupService, private rout:Router) { }
 
   userData:any = localStorage.getItem('verificationData');
  if (verificationData: any) {
    const user = JSON.parse(verificationData);
  }
  changePassword(value:any){
    const payload={
      email:this.userData.email,
      password:value.password,
      confirmpassword:value.confirmpassword,
      otp:this.userData.otp
    }
    this.signup.changePassword(payload).subscribe((result:any)=>{
      console.log(result);
  
      if(result.message=="Password changed successfully"){
        this.rout.navigate(['login']);
      }
    }
    )

  }

}
