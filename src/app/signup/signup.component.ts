import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements  OnInit {
  myform!: FormGroup;
  constructor(private router:Router, private service:SignupService, private formbuilder:FormBuilder){}
  ngOnInit(): void {
    this.myform = this.formbuilder.group({
      name:new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required ]),
      password: new FormControl('', [Validators.required]),
    //   password: ['', [Validators.required, Validators.minLength(6), 
    // this.passwordPatternValidator(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)]],
    });
    console.log(this.myform.valid);

  }

name:string="";
email:string="";
password:string="";



submit(val:any){
  console.log('out',val);
  
  // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(val));

this.service.register(val).subscribe((result:any)=>{
  console.log(result);
  alert(result.message);
  this.verification()
})
}

verification() {
  this.router.navigate(['verification']);
  }
}
