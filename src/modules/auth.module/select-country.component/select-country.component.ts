import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SelectUserComponent } from '../select-user.component/select-user.component';
import { AuthService } from '../auth.service/auth.service';

@Component({
  selector: 'page-select-country',
  templateUrl: 'select-country.component.html'
})
export class SelectCountryComponent {

  userID      : any;
  countryList : any;
  observer    : any;

  constructor(private navCtrl : NavController, private navParams : NavParams, private authService : AuthService) {

  }

  ionViewDidEnter(){
    this.userID   = this.navParams.get("UserID"); 
    this.observer = this.authService.getCountryList().subscribe((list) => {
      this.countryList = list;
    });
  }

  ionViewDidLeave(){
    this.observer.unsubscribe();
  }

  onCountrySelect(country){
    this.navCtrl.push(SelectUserComponent,{Country : country, UserID : this.userID});
  }

}
