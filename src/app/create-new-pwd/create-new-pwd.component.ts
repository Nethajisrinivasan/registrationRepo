import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-pwd',
  templateUrl: './create-new-pwd.component.html',
  styleUrls: ['./create-new-pwd.component.scss']
})
export class CreateNewPwdComponent implements OnInit{
  password:string=''
  confirmpassword:string=''
  email:string=''
  constructor(private signup:SignupService, private rout:Router) { }
  ngOnInit(): void {
    
   const userData = localStorage.getItem('user');
   if (userData) {
     const user = JSON.parse(userData);
     this.email = user.email;
     console.log(this.email);
   }
  }
 


  
  changePassword(value:any){
    const payload={
      email:this.email,
      password:value.password,
      confirmpassword:value.confirmpassword,
    }
    console.log(payload);
    this.signup.updatepassword(payload).subscribe((result:any)=>{
      console.log(result);
  
      if(result.message=="Password changed successfully"){
        this.rout.navigate(['login']);
      }
    }
    )

  }

}
