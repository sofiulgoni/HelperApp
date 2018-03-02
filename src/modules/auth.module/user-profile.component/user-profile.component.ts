import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { CardInfoComponent } from '../card-info.component/card-info.component';
import { User } from '../../common.module/data.model/user.model';
import { AuthService } from '../auth.service/auth.service';
import { UtilService } from '../../common.module/util.service/util.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent {

  update        = false;
  userInfo      = new User();
  genderList    = ['Male','Female'];
  languageWatch : any;

  constructor(private navCtrl : NavController, private navParams : NavParams, private authService : AuthService, private actionSheetCtrl : ActionSheetController, private camera : Camera, private utilService : UtilService) {

  }

  ionViewDidEnter(){
    this.update   = this.navParams.get("Update");
    this.userInfo = this.navParams.get("UserInfo");
    this.languageWatch = this.authService.getLanguageList().subscribe((list) => {
      this.initLanguageList(list);
    });
  }

  ionViewDidLeave(){
    this.languageWatch.unsubscribe();
  }

  private initLanguageList(list){
    var languageList = [];
    for(var i = 0; i < list.length; i ++ ){
      var language = {name : list[i].name, active : this.checkUserLanguage(list[i].name)};
      languageList.push(language);
    }
    this.userInfo.language = languageList;
  }

  private checkUserLanguage(languageName){
    if(this.userInfo.language != undefined){
      if(this.userInfo.language.find((language : any) => language.name == languageName && language.active)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  selectImage(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then(imageData => {
              console.log("Library Image Data : ", imageData);
              this.userInfo.image = 'data:image/jpeg;base64,' + imageData;
            }).catch(error => {
              console.log("Library Image Failed : ", error);
            });
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA).then(imageData => {
              console.log("Camera Image Data : ", imageData);
              this.userInfo.image = 'data:image/jpeg;base64,' + imageData;
            }).catch(error => {
              console.log("Camera Image Failed : ", error);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Camera Image Canceled");
          }
        }
      ]
    });
    actionSheet.present();
  }

  private takePicture(sourceType){
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      targetWidth: 100,
      targetHeight: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(options);
  }

  saveUserData(userInfo){
    if(userInfo.image != undefined){
      if(this.checkIfLanguageSelected(this.userInfo.language)){
        this.navCtrl.push(CardInfoComponent, {Update : false, UserInfo : this.userInfo});
      }else{
        this.utilService.showToast("Select minimum one language");
      }
    }else{
      this.utilService.showToast("Select an image first");
    }
  }

  private checkIfLanguageSelected(list){
    for(var i = 0; i < list.length; i ++){
      if(list[i].active){
        return true;
      }
    }
    return false;
  }

  updateUserData(userInfo){
    console.log("Update User Data");
  }

}
