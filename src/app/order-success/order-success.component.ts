
import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnDestroy {

  orderID:string;

  constructor() {
    this.orderID = localStorage.getItem('orderID')!;
  }
  ngOnDestroy() {
    localStorage.removeItem('orderID');
  }
}
