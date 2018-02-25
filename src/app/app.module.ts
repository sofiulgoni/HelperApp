import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsComponent } from '../modules/common.module/tabs.component/tabs.component';

// Auth Module
import { LoginComponent } from '../modules/auth.module/login.component/login.component';
import { AuthService } from '../modules/auth.module/auth.service/auth.service';

// Order Module
import { OrderHomeComponent } from '../modules/order.module/order-home.component/order-home.component';
import { OrderService } from '../modules/order.module/order.service/order.service';

// Native Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsComponent,
    LoginComponent,
    OrderHomeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsComponent,
    LoginComponent,
    OrderHomeComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    OrderService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
