import { Component } from '@angular/core';

import { AuthService } from '../auth.service/auth.service';
import { UtilService } from '../../common.module/util.service/util.service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  email    : string = "";
  password : string = "";

  constructor(private authService : AuthService, private utilService : UtilService) {

  }

  registerUser(email, password){
    this.utilService.showSpinner();
    this.authService.registerWithEmail(email, password).then(() => {
      this.utilService.hideSpinner();
      console.log("Register Success");
    }).catch(error => {
      this.utilService.hideSpinner();
      this.utilService.showToast("No Internet Connection");
      console.log(error);
    });
  }

}
