import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-new-pwd',
  templateUrl: './create-new-pwd.component.html',
  styleUrls: ['./create-new-pwd.component.scss']
})
export class CreateNewPwdComponent implements OnInit{

   myForm:FormGroup | undefined;

  password:string=''
  confirmpassword:string=''
  email:string=''
  constructor(private signup:SignupService, private rout:Router, private formbuilder:FormBuilder) { }
  
  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
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
      alert(result.message);
      if(result.message=="Password changed successfully"){
        this.rout.navigate(['login']);
      }
    }
    )

  }

}
