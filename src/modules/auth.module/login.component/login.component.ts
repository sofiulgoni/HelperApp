import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterComponent } from '../register.component/register.component';
import { ResetPasswordComponent } from '../reset-password.component/reset-password.component';
import { AuthService } from '../auth.service/auth.service';
import { UtilService } from '../../common.module/util.service/util.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  email    : string = "";
  password : string = "";

  constructor(private navCtrl : NavController, private authService : AuthService, private utilService : UtilService) {
    
  }

  loginUser(email, password){
    this.utilService.showSpinner();
    this.authService.loginWithEmail(email, password).then(() => {
      this.utilService.hideSpinner();
      console.log("Login Success");
    }).catch(error => {
      this.utilService.hideSpinner();
      console.log(error);
    });
  }

  registerUser(){
    this.navCtrl.push(RegisterComponent);
  }

  forgotPassword(){
    this.navCtrl.push(ResetPasswordComponent);
  }

}
