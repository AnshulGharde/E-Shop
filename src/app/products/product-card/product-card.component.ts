import { ShoppingCartService } from './../../shopping-cart.service';
import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart!: { items: { [x: string]: any; }; };
  @Input('showProductQuantity') showProductQuantity!: boolean;
  constructor(private cartService: ShoppingCartService) { }
  
  addToCart(){
    this.cartService.addToCart(this.product);
  }

  getQuantity(){
    if (!this.shoppingCart) {
      return 0;
    } else {
      let item = this.shoppingCart.items[this.product.key];
      return item ? item.quantity : 0;
    }
  }
}
