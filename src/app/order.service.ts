import { map, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private cartService: ShoppingCartService, private db: AngularFireDatabase) { }

  async storeOrder(order: Order) {
    let orderID = await this.db.list('/orders').push(order);
    //console.log(orderID.key);
    this.db.list('/orders/'+orderID.key).set('key',orderID.key);
    this.cartService.emptyCart();

    return orderID;
  }
  getOrderByID(orderID:string){
    return this.db
        .list('/orders/' + orderID + '/items/')
        .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                product: action.payload.child('product').exportVal(),
                quantity: action.payload.child('quantity').val()                
            }));
        }));
  }
  getDateByID(orderID:string){
    return  this.db
    .object('/orders/'+orderID);//+'/datePlaced'
  }

  getOrders():AngularFireList<Order> { 
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string):AngularFireList<Order> {
    return this.db.list('/orders', ref => ref.orderByChild('userID').equalTo(userId));
  }
  getID(){
    
  }
}
