import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProfileComponent } from '../user-profile.component/user-profile.component';
import { AuthService } from '../auth.service/auth.service';
import { User } from '../../common.module/data.model/user.model';

@Component({
  selector: 'page-cleaner-info',
  templateUrl: 'cleaner-info.component.html'
})
export class CleanerInfoComponent {

  update      = false;
  userInfo    = new User();
  newLocation = "";
  serviceWatch : any;

  constructor(private navCtrl : NavController, private navParams : NavParams, private authService : AuthService) {

  }

  ionViewDidEnter(){
    this.update   = this.navParams.get("Update");
    this.userInfo = this.navParams.get("UserInfo");
    if(this.userInfo.cleanerInfo == undefined){
      this.userInfo.cleanerInfo = {gender : "Male", intro : "", services : [], locations : []};
    }
    this.serviceWatch = this.authService.getServiceList().subscribe( (list) => {
      this.initServiceList(list);
    });
  }

  ionViewDidLeave(){
    this.serviceWatch.unsubscribe();
  }

  private initServiceList(list){
    var serviceList = [];
    for(var i = 0; i < list.length; i ++ ){
      var service = {id : list[i].id, name : list[i].name, active : this.checkUserService(list[i].id)};
      serviceList.push(service);
    }
    this.userInfo.cleanerInfo.services = serviceList;
  }

  private checkUserService(serviceID){
    if(this.userInfo.cleanerInfo.services != undefined){
      if(this.userInfo.cleanerInfo.services.find((service : any) => service.id == serviceID && service.active)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  addNewJobLocation(location){
    if(this.userInfo.cleanerInfo.locations != undefined && this.userInfo.cleanerInfo.locations.indexOf(location) == -1 && location != "" && this.userInfo.cleanerInfo.locations.length < 5){
      this.userInfo.cleanerInfo.locations.push(location);
      this.newLocation = "";
    }
  }

  removeJobLocation(location){
    this.userInfo.cleanerInfo.locations.splice(this.userInfo.cleanerInfo.locations.indexOf(location), 1);
  }

  goToUserProfile(userInfo){
    this.navCtrl.push(UserProfileComponent,{Update : false, UserInfo : this.userInfo});
  }

  updateCleanerInfo(userInfo){
    console.log("Update Cleaner Info");
  }

}
