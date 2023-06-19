import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
 
  email: string = '';

  constructor(private router: Router, private signup: SignupService) {
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
    otp: value
  };

  this.signup.verification(verificationData).subscribe((result:any)=>{
    console.log(result);
    alert(result);
    this.router.navigate(['login']);
  }
  )
}

code: string='';

login() {
  this.router.navigate(['login']);
  }
}
