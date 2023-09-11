import { Router } from '@angular/router';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Shipping } from './../models/shipping';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = new Shipping();
  cart!: ShoppingCart;
  userID!: string;

  totalPrice!: number;
  cart$!: Observable<ShoppingCart | null>;
  cartItems!: ShoppingCartItem[];
  subscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,

    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private cartService: ShoppingCartService) {
      
    }
    shoppingCartItemCount: number = 0;

  cartSubscription!: Subscription;
  userSubscription!: Subscription;

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => this.cart = cart!);
    this.userSubscription = this.authService.USER$.subscribe(user => this.userID = user!.uid);

    let cartID = localStorage.getItem('cartId')!;
    this.subscription =  this.cartService.getAllItems(cartID)
     .subscribe(item => this.cartItems= item);

    this.cart$ = (await this.cartService.getCart()).valueChanges();
    
    this.cart$.subscribe(cart =>{
      if(cart){
      this.shoppingCartItemCount = 0;
      for(let productID in cart!.items){
        this.shoppingCartItemCount += cart!.items[productID].quantity;
      }
      this.totalPrice = 0;
      for(let productID in cart!.items){
        this.totalPrice += cart!.items[productID].quantity * cart!.items[productID].product.price ;
      }
      }
    });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.subscription.unsubscribe();
  
  }

  async placeOrder() {

    let order =  new Order( this.userID, this.shipping, this.cart, this.totalPrice);

    let result = await this.orderService.storeOrder(order);
    localStorage.setItem('orderID',result.key!);
    await this.router.navigate(['/order-success', result.key])

  }
}
