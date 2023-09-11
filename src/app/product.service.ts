import { ShoppingCartService } from './shopping-cart.service';


import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase,private cartService: ShoppingCartService) { }

  create(product: object){
    return this.db.list('/products').push(product);
  }

  getAll(){
    //return this.db.list('/products');
    return this.db
        .list('/products')
        .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                key: action.key,
                val: action.payload.exportVal(),
                title: action.payload.child('title').val(),
                price: action.payload.child('price').val(),
                category:  action.payload.child('category').val(),
                imageURL:  action.payload.child('imageURL').val(),
            }));
        }));
  }

  getWithID(productID: string){
    return this.db
        .object('/products/'+productID);
  }

  updateProduct(product: object,productID: string){
    return this.db.list('/products').update(productID,product);
  }

  deleteProduct(productID: string){
    this.cartService.deleteFromCart(productID);
    return this.db.object('/products/'+productID).remove();
  }
}
