import { Router } from '@angular/router';
import { Order } from './../models/order';
import { async } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Component, OnInit } from '@angular/core';
// import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs';

@Component({
  selector: 'my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  orders$ ;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router) { 

    this.orders$ = authService.USER$.  pipe ( switchMap(  (u) => orderService.getOrdersByUser(u!.uid).valueChanges()))! ;

  }

  async viewOrder(orderID:string){
    localStorage.setItem('orderID',orderID);
    localStorage.setItem('admin','false');
    await this.router.navigate(['/view-order', orderID]);
  }
}
