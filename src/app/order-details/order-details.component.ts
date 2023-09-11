import { Component, Input, OnInit } from '@angular/core';
import { orderDate } from '../models/orderDate';
import { Shipping } from '../models/shipping';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { OrderService } from '../order.service';
import { take } from 'rxjs';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  @Input('orderID')orderID!:string;
  order: ShoppingCartItem[]=[];
  date!: number; //= new orderDate();
  totalPrice!:number;
  shipping = new Shipping();

  constructor(private orderService: OrderService) { 
  }

  ngOnInit(): void {
    
    this.orderService.getDateByID(this.orderID).snapshotChanges().pipe(take(1)).subscribe(p =>{
      this.date =p.payload.child('datePlaced').exportVal();
      this.totalPrice = p.payload.child('totalPrice').val();
      this.shipping = p.payload.child('shipping').exportVal();
      p.payload.child('items').forEach(p => {
        let item = new ShoppingCartItem();
        item = p.exportVal();
        this.order.push(item);
      })
      
    });
    
  }

}
