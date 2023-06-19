import { Component, OnInit} from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
name: any;
password: any;
myform!: FormGroup;
constructor(private service: SignupService, private router: Router, private messageService: MessageService, private formbuilder:FormBuilder) { }
  
ngOnInit(): void {
    this.myform = this.formbuilder.group({
      'email': new FormControl('', [Validators.email, Validators.required ]),
      'password': new FormControl('', [Validators.required]),
    //   password: ['', [Validators.required, Validators.minLength(6), 
    // this.passwordPatternValidator(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)]],
    });
    
  }

  get myFormControls() {
    return this.myform.controls;  
  }

  // value:any;
    login() {
      // this.value=value;
    if(this.myform.invalid) return
      
      let loginData = this.myform.value;
      console.log("login component value ",loginData);
      this.service.login(loginData).subscribe((result: any) => {
        console.log(result);
        console.log(result.msg);

        if (result.msg) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
          this.home();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed' });
        }
      });
      
      
    }
    home() {
      this.router.navigate(['home']);
      }
      //  passwordPatternValidator(arg0: RegExp): any | string {
      //   throw new Error('Function not implemented.');
      // }
}
