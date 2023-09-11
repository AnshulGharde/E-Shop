import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Product } from './../models/product';
import { Subscription, take } from 'rxjs';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  
  product: Product[]=[];
  filteredProducts : Product[] =this.product;
  category!:string;
  cart: any;
  subscription!: Subscription;
  quantity!: number;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService:ShoppingCartService){

    

    productService.getAll().pipe(take(1)).subscribe(p => {
      this.product = p;

      route.queryParamMap.subscribe(params =>{
        this.category = params.get('category')!;
        
        this.filteredProducts = (this.category) ?
          this.product.filter(p => p.category === this.category) :
          this.product;

        this.quantity = this.filteredProducts.length % 4;
      })
    });

    
   }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges()
   .subscribe(cart => {
     
     return this.cart = cart;
   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
//no
