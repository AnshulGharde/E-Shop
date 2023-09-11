
import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService,private router: Router) { 
    this.orders$ = orderService.getOrders().valueChanges();
  }
  async viewOrder(orderID:string){
    localStorage.setItem('orderID',orderID);
    localStorage.setItem('admin','true');
    await this.router.navigate(['/view-order', orderID]);
  }
}
