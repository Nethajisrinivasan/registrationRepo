import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { CreateNewPwdComponent } from './create-new-pwd/create-new-pwd.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { VerificationComponent } from './verification/verification.component';
import { HomeComponent } from './home/home.component';
import { ResetpwdverificationComponent } from './resetpwdverification/resetpwdverification.component';


const routes: Routes = [
  {path:'login',component:LoginpageComponent},
  {path:'signup',component:SignupComponent},
  {path:'verification',component:VerificationComponent},
  {path:'forgot-pwd',component:ForgotPwdComponent},
  {path:'create-new-pwd',component:CreateNewPwdComponent},
  {path:'resetpwdverification',component:ResetpwdverificationComponent},
  {path:'home', component:HomeComponent},

  {path:'**', component:LoginpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
