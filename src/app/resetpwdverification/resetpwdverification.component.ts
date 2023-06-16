import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-resetpwdverification',
  templateUrl: './resetpwdverification.component.html',
  styleUrls: ['./resetpwdverification.component.scss']
})
export class ResetpwdverificationComponent implements OnInit{

  email: string = '';

  constructor(private router: Router, private signup: SignupService) {}
  ngOnInit(): void {
     // Retrieve email from local storage
     const userData = localStorage.getItem('user');
     if (userData) {
       const user = JSON.parse(userData);
       this.email = user.email;
     }
  }
  
  

verification(value: any) {
  // value=value;
  console.log("otp is ",value);
  const verificationData = {
    email: this.email,
    otp: value.otp
  };

  this.signup.changePassword(verificationData).subscribe((result:any)=>{
    console.log(result);
    alert(result);
    this.router.navigate(['create-new-pwd']);
  }
  )
}

code: string='';



}
