import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{
  @Input('product') product!: Product;
  @Input('shoppingCart') shoppingCart!: { items: { [x: string]: any; }; } |null;
  @Input('numberToDisplay') numberToDisplay!: number;
  @Input('showProductQuantity') showProductQuantity!: boolean;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    
    if((this.numberToDisplay===1)){
      if(!confirm("Do you want to remove this item from cart??"))
      {
        return;
      }
    }
    this.cartService.removeFromCart(this.product);
    
    
  }
  getQuantity(){
    
    let item = this.shoppingCart!.items[this.product.key];
    return item ? item.quantity : 0;
  
  }
  
}
