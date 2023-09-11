import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit , OnDestroy{
  admin:string;
  orderID:string;

  constructor(private router: Router) {
    this.orderID = localStorage.getItem('orderID')!;
    this.admin = localStorage.getItem('admin')!;  
  }
  ngOnInit() {
    this.admin = localStorage.getItem('admin')!;
    
  }
  ngOnDestroy(){
    localStorage.removeItem('admin');
  }

  goBack(){
    if(this.admin === 'true'){
      this.router.navigateByUrl('/admin/admin-orders');
    }
    else{
      this.router.navigateByUrl('/my-order');
    }
  }
}
