import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// App Root
import { MyApp } from './app.component';

// Native Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

// Firebase Plugins
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule  } from 'angularfire2/firestore';
import { FirebaseConfig } from './firebase.config';

// Auth Module
import { LoginComponent } from '../modules/auth.module/login.component/login.component';
import { RegisterComponent } from '../modules/auth.module/register.component/register.component';
import { ResetPasswordComponent } from '../modules/auth.module/reset-password.component/reset-password.component';
import { CardInfoComponent } from '../modules/auth.module/card-info.component/card-info.component';
import { SelectCountryComponent } from '../modules/auth.module/select-country.component/select-country.component';
import { SelectUserComponent } from '../modules/auth.module/select-user.component/select-user.component';
import { UserProfileComponent } from '../modules/auth.module/user-profile.component/user-profile.component';
import { CleanerInfoComponent } from '../modules/auth.module/cleaner-info.component/cleaner-info.component';
import { AuthService } from '../modules/auth.module/auth.service/auth.service';

// Order Module
import { OrderHomeComponent } from '../modules/order.module/order-home.component/order-home.component';
import { OrderService } from '../modules/order.module/order.service/order.service';

// Job Module
import { JobNotificationComponent } from '../modules/job.module/job-notification.component/job-notification.component';
import { JobService } from '../modules/job.module/job.service/job.service';

// Common Module
import { TabsComponent } from '../modules/common.module/tabs.component/tabs.component';
import { UtilService } from '../modules/common.module/util.service/util.service';


@NgModule({
  declarations: [
    MyApp,
    TabsComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SelectCountryComponent,
    SelectUserComponent,
    UserProfileComponent,
    CardInfoComponent,
    CleanerInfoComponent,
    OrderHomeComponent,
    JobNotificationComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
            ios: {
              statusbarPadding: true
            }
          }
    }),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SelectCountryComponent,
    SelectUserComponent,
    UserProfileComponent,
    CardInfoComponent,
    CleanerInfoComponent,
    OrderHomeComponent,
    JobNotificationComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AuthService,
    OrderService,
    JobService,
    UtilService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
