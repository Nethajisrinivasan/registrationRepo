import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { VerificationComponent } from './verification/verification.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { CreateNewPwdComponent } from './create-new-pwd/create-new-pwd.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ResetpwdverificationComponent } from './resetpwdverification/resetpwdverification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignupComponent,
    VerificationComponent,
    ForgotPwdComponent,
    CreateNewPwdComponent,
    HomeComponent,
    ResetpwdverificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ReactiveFormsModule,  
    ButtonModule,
    FormsModule,HttpClientModule,MessagesModule,MessageModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
