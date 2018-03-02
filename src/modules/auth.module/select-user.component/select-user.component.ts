import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProfileComponent } from '../user-profile.component/user-profile.component';
import { CleanerInfoComponent } from '../cleaner-info.component/cleaner-info.component';

import { User } from '../../common.module/data.model/user.model';

@Component({
  selector: 'page-select-user',
  templateUrl: 'select-user.component.html'
})
export class SelectUserComponent {

  country  : any;
  userInfo = new User();

  constructor(private navCtrl : NavController, private navParams : NavParams) {

  }

  ionViewDidEnter(){
    this.country          = this.navParams.get("Country");
    this.userInfo.id      = this.navParams.get("UserID");
    this.userInfo.country = this.country.id;
    this.userInfo.fcm     = "";
    this.userInfo.client  = [];
  }

  onCustomerSelect(){
    this.userInfo.role   = "Customer";
    this.userInfo.rating = {equipment : 0, easy : 0, time : 0};
    this.navCtrl.push(UserProfileComponent,{Update : false, UserInfo : this.userInfo});
  }

  onCleanerSelect(){
    this.userInfo.role   = "Cleaner";
    this.userInfo.rating = {attendance : 0, responsiveness : 0, cleanliness : 0};
    this.navCtrl.push(CleanerInfoComponent,{Update : false, UserInfo : this.userInfo});
  }

}
