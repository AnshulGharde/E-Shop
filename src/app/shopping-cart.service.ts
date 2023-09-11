import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  

  create() {
    return this.db.list('/shopping-carts').push({
      //dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    //console.log(6);
    let cartID = await this.getOrCreateCartID();
    //console.log(cartID);
    return this.db.object('/shopping-carts/' + cartID);
  }

  async getOrCreateCartID(): Promise<string> { //private
    let cartID:string;
    
    cartID = localStorage.getItem('cartId')!;
     if ( cartID) return cartID;


    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    //console.log(result.key);
    return result.key!;

  }

  getAllItems(cartID: string){
    return this.db
        .list('/shopping-carts/' + cartID + '/items/')
        .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                product: action.payload.child('product').exportVal(),
                quantity: action.payload.child('quantity').val()                
            }));
        }));
  }

  private getItem(cartID: string, productID: string) {
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product,1);
  }
  async removeFromCart(product: Product) {
    this.updateItemQuantity(product,-1);
    
  }

  private async updateItemQuantity(product: Product,  change: number){
    //console.log(4);
    let cartID = await this.getOrCreateCartID();
    let item$ = this.getItem(cartID, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if (item) {
        item$.update({ quantity: item.quantity + change });
        //console.log('/shopping-carts/' + cartID + '/items/' + product.key)
        if((item.quantity===1)&&(change===-1)){
          //console.log(product.key);
          this.db.object('/shopping-carts/' + cartID + '/items/' + product.key).remove();
        }

      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }
  async deleteFromCart(productID:string){
    let cartID = await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID).remove();
  }
  async emptyCart(){//cartID: string
    let cartID = await this.getOrCreateCartID();
    this.db.object('/shopping-carts/' + cartID+ '/items' ).remove();
  }
}
// no