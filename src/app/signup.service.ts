import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
url:any;
otp:number=0;
  constructor( private http: HttpClient) { }

  //register
  register(body:any){
    console.log("signup service",body);
    
  this.url="http://localhost:3000/signup/signup";
  return this.http.post(this.url,body);
  }

  //verification
  verification(body:any){
    console.log("verification service otp is ",body);
    this.url="http://localhost:3000/signup/verify";

    return this.http.post(this.url,body);
  }

  //login
  login(body:any){
    console.log("login service",body);
    this.url="http://localhost:3000/signup/login";
    return this.http.post(this.url,body);
  }

  //send otp
  sendotp(body:any){
    console.log("send otp service",body);
    this.url="http://localhost:3000/signup/forgotpassword";
    return this.http.post(this.url,body);
  }
  
  //change password
  changePassword(body:any){
    console.log("change password service",body);
    this.url="http://localhost:3000/signup/resetpassword";
    return this.http.post(this.url,body);
  }
}
