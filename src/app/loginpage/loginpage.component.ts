import { Component } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {
name: any;
password: any;
  
constructor(private service: SignupService, private router: Router, private messageService: MessageService) { }

  // value:any;
    login(value:any) {
      // this.value=value;
      console.log("login component value ",value);
      this.service.login(value).subscribe((result: any) => {
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
}
