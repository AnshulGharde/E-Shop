import { Component, Input } from '@angular/core';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})

export class ShoppingCartSummaryComponent {

  @Input('totalPrice') totalPrice!: number;
  @Input('shoppingCartItemCount') shoppingCartItemCount!: number;
  @Input('cartItems') cartItems!: ShoppingCartItem[];

}
