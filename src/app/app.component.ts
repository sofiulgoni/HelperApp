import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsComponent } from '../modules/common.module/tabs.component/tabs.component';
import { LoginComponent } from '../modules/auth.module/login.component/login.component';
import { SelectCountryComponent } from '../modules/auth.module/select-country.component/select-country.component';

import { AuthService } from '../modules/auth.module/auth.service/auth.service';
import { UtilService } from '../modules/common.module/util.service/util.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;

  rootPage:any = LoginComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService : AuthService, private utilService : UtilService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeApp();
    });
  }

  private initializeApp(){
    this.utilService.showSpinner();
    this.authService.getFirebaseAuth().onAuthStateChanged( (firebaseUser) => {
      if(firebaseUser != null){
        console.log("Auth Observer : User Logged In");
        this.authService.getUserDataFromID(firebaseUser.uid).then( (userData) => {
          this.utilService.hideSpinner();
          console.log(userData);
          if(userData != null){
            console.log("Auth Observer : User Data Found");
            this.utilService.setUserData(userData);
            this.navCtrl.setRoot(TabsComponent);
          }else{
            console.log("Auth Observer : User Data Not Found");
            this.navCtrl.setRoot(SelectCountryComponent, {UserID : firebaseUser.uid});
          }
        }).catch(error => {
          this.utilService.hideSpinner();
          this.utilService.showToast("No Internet Connection");
          console.log(error);
        });
      }else{
        this.utilService.hideSpinner();
        console.log("Auth Observer : User Logged Out");
        this.navCtrl.setRoot(LoginComponent);
      }
    });
  }
}
