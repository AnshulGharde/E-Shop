import { Product } from './../../models/product';
import { CheckOutComponent } from './../../check-out/check-out.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take, Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  
  id:string|null;
  product = new Product();
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService,
    private productService: ProductService) {
      this.categories$ = categoryService.getALL();
    
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.productService.getWithID(this.id).snapshotChanges().pipe(take(1)).subscribe(p =>{
        this.product =p.payload.exportVal();
      });
      
  }

  ngOnInit(): void {
  }

  deleteProductByID(productID:string){
    if(confirm("ARE YOU SURE YOU WANT TO DELETE THIS ITEM?"))
    {
      this.productService.deleteProduct(productID);
      this.router.navigateByUrl("/admin/products");
    }
  }

  save(product: object){
    if(!this.id) this.productService.create(product);
    else this.productService.updateProduct(product,this.id);
    this.router.navigateByUrl("/admin/products");
  }
}
