import { Component } from '@angular/core';

import { AuthService } from '../auth.service/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private authService : AuthService) {

  }

}
