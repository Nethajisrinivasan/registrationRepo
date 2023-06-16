import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private router:Router, private service:SignupService){}

name:string="";
email:string="";
password:string="";



submit(val:any){
  console.log('out',val);
  
  // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(val));

this.service.register(val).subscribe((result:any)=>{
  console.log(result);
  this.verification()
})
}

verification() {
  this.router.navigate(['verification']);
  }
}
