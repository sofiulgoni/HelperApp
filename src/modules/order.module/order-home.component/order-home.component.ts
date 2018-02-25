import { Component } from '@angular/core';

import { OrderService } from '../order.service/order.service';

@Component({
  selector: 'page-order-home',
  templateUrl: 'order-home.component.html'
})
export class OrderHomeComponent {

  constructor(private orderService : OrderService) {

  }

}
