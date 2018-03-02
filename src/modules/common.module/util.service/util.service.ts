import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilService {

  spinner = null;
  toast   = null;
  user    = null;
  
  constructor( private loadingCtrl : LoadingController, private toastCtrl : ToastController) {
    
  }

  public showSpinner(){
    this.spinner = this.loadingCtrl.create({
      spinner : 'dots'
    });
    this.spinner.present();
  }

  public hideSpinner(){
    this.spinner.dismiss();
  }

  public showToast(message){
    this.toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: "toast.scss"
    });
    this.toast.present();
  }

  public setUserData(user){
    this.user = user;
  }

  public getUserData(){
    return this.user;
  }

  public getUserRole(){
    if(this.user != null){
      return this.user.role;
    }else{
      return "Customer";
    }
  }
}
