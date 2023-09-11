import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[] ;
  filteredProducts!: any[];
  subscription!: Subscription;



  constructor(private productService:ProductService) {
    
  }
  filter(query: string){//filtering on client
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title!.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription =  this.productService.getAll()
      .subscribe(products =>this.filteredProducts = this.products= products);

  }

}
