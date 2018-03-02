import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsComponent } from '../../common.module/tabs.component/tabs.component';
import { User } from '../../common.module/data.model/user.model';
import { AuthService } from '../auth.service/auth.service';
import { UtilService } from '../../common.module/util.service/util.service';

@Component({
  selector: 'page-card-info',
  templateUrl: 'card-info.component.html'
})
export class CardInfoComponent {

  update   = false;
  cardInfo = {number : "", cvc : "", expMonth : "", expYear : ""};
  userInfo = new User();

  constructor(private navCtrl : NavController, private navParams : NavParams, private authService : AuthService, private utilService : UtilService) {

  }

  ionViewDidEnter(){
    this.update   = this.navParams.get("Update");
    this.userInfo = this.navParams.get("UserInfo");
    if(this.userInfo.cardInfo != undefined){
      this.cardInfo = this.userInfo.cardInfo;
    }
  }

  saveCardInfo(cardInfo){
    this.userInfo.cardInfo = cardInfo;
    // Check Card Validation First Then Save User data
    this.utilService.showSpinner();
    this.authService.uploadImage(this.userInfo.id, this.userInfo.name, this.userInfo.image).then((imageUrl) => {
      this.userInfo.image = imageUrl.downloadURL;
      console.log("Image Url : "+this.userInfo.image);
      this.authService.saveUserData(this.userInfo).then(() => {
        this.utilService.hideSpinner();
        console.log("User Data Saved");
        this.utilService.setUserData(this.userInfo);
        this.navCtrl.setRoot(TabsComponent);
      }).catch(error => {
        this.utilService.hideSpinner();
        console.log(error);
        this.utilService.showToast("No Internet Connection");
      });
    }).catch(error => {
      this.utilService.hideSpinner();
      console.log(error);
      this.utilService.showToast("No Internet Connection");
    });
  }

  updateCardInfo(cardInfo){
    // Check Card Validation First
    this.utilService.showSpinner();
    this.authService.updateUserCardInfo(this.userInfo.id, this.cardInfo).then(() => {
      this.utilService.hideSpinner();
      console.log("Card Updated");
      this.userInfo.cardInfo = this.cardInfo;
    }).catch(error => {
      this.utilService.hideSpinner();
      console.log("Card Update Failed");
      this.utilService.showToast("No Internet Connection");
    });
  }

}
