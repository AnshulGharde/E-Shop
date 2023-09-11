import { ShoppingCartService } from './shopping-cart.service';
import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import * as firebase from 'firebase/auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase,private cartService: ShoppingCartService) { }

  async save(user: firebase.User){

    if(await this.checkCart(user.uid)){
      this.db.object('/users/'+user.uid).update({
        name: user.displayName,
        email: user.email
      });
      // console.log(1);
    }
    else{
      this.db.object('/users/'+user.uid).update({
        name: user.displayName,
        email: user.email,
        cartID: this.cartService.create().key
      });
      // console.log(2);
    }
    // this.db.object('/users/'+user.uid+'/cartID').snapshotChanges().pipe(take(1)).subscribe(p =>{
    //     localStorage.setItem('cartId',p.payload.exportVal());
    //   });
    // console.log(3);
    
  }

  async checkCart(uid: string){
    let isthere!:boolean;
    
    await this.db.database.ref('/users').once('value', function (snapshot) {
      if (snapshot.hasChild(uid)) {
        isthere = true;
      }
      else{
        isthere = false;
      }
    })

    
    
    return isthere;
    //'/users/'+uid +'/cartID'
    
  }

  get(uid: string): AngularFireObject<AppUser>{
    return this.db.object('/users/' +uid);
  }
}
