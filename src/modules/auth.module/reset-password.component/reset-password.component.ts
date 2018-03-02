import { Component } from '@angular/core';

import { AuthService } from '../auth.service/auth.service';
import { UtilService } from '../../common.module/util.service/util.service';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent {

  email : string = "";

  constructor(private authService : AuthService, private utilService : UtilService) {

  }

  resetPassword(email){
    this.utilService.showSpinner();
    this.authService.resetPassword(email).then(() => {
      this.utilService.hideSpinner();
      console.log("Reset Email Sent");
      this.utilService.showToast("Reset Email Sent");
    }).catch(error => {
      this.utilService.hideSpinner();
      console.log(error);
      this.utilService.showToast("No Internet Connection");
    });
  }

}
