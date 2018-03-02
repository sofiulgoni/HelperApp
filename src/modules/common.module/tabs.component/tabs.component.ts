import { Component } from '@angular/core';

import { OrderHomeComponent } from '../../order.module/order-home.component/order-home.component';
import { JobNotificationComponent } from '../../job.module/job-notification.component/job-notification.component';
import { UtilService } from '../util.service/util.service';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

  userRole = "Customer";
  tab1Root = OrderHomeComponent;
  tab2Root = OrderHomeComponent;
  tab3Root = OrderHomeComponent;
  tab4Root = OrderHomeComponent;
  tab5Root = OrderHomeComponent;
  tab6Root = JobNotificationComponent;
  tab7Root = OrderHomeComponent;

  constructor(utilService : UtilService) {
    this.userRole = utilService.getUserRole();
  }
  
}
