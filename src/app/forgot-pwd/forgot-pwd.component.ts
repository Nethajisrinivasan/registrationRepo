import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {
email:any={};
myform!: FormGroup;
  constructor(private signup:SignupService, private rout:Router, private fb:FormBuilder) { }
  ngOnInit(): void {
   this.myform = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required ]),
    });
    
  }
  sendotp(value:any){
    console.log("email is ",value);
    localStorage.setItem('user', JSON.stringify(value));

    this.email=value;
    this.signup.sendotp(this.email).subscribe((result:any)=>{
      console.log(result);
     alert(result.message);
      if(result.message=="A verification code has been sent to your email"){
      this.rout.navigate(['resetpwdverification']);
     }

    }
    )
  }
}
