import { Component } from '@angular/core';

import { OrderHomeComponent } from '../../order.module/order-home.component/order-home.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

  tab1Root = OrderHomeComponent;
  tab2Root = OrderHomeComponent;
  tab3Root = OrderHomeComponent;
  tab4Root = OrderHomeComponent;
  tab5Root = OrderHomeComponent;

  constructor() {

  }
}
