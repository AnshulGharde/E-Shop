import { ShoppingCartService } from './../shopping-cart.service';
import { Router } from '@angular/router';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser!: AppUser;
  shoppingCartItemCount!: number;

  constructor(private shoppingCartService:ShoppingCartService, private  auth: AuthService, private router: Router) {
    
  }

  logout() {
    this.auth.logout();
    
    this.router.navigateByUrl('/');
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser!);
    let cart$ = await this.shoppingCartService.getCart();
    
    cart$.valueChanges().subscribe(cart =>{
      this.shoppingCartItemCount = 0;
      if(cart){
        for(let productID in cart!.items){
          this.shoppingCartItemCount += cart!.items[productID].quantity;

        }
      }
    });
  }
}
// no