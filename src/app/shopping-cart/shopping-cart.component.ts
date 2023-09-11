
import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit ,OnDestroy{

  
  totalPrice!: number;
  cart$!: Observable<ShoppingCart | null>;
  cartItems!: ShoppingCartItem[];
  subscription!: Subscription;
  shoppingCartItemCount: number = 0;

  constructor(private cartService: ShoppingCartService) {
    //router.navigateByUrl('/shopping-cart');
   }


  async ngOnInit() {
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
      }}
    });
  }

  emptyCart(){
    if(confirm("Do your really want to empty your Cart"))
    {
      this.cartService.emptyCart();
      this.shoppingCartItemCount = 0;
      this.totalPrice = 0;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
