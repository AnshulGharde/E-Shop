import { OrderService } from './order.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { DataTablesModule } from "angular-datatables";
import {MatTableModule} from '@angular/material/table';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ViewOrderComponent } from './view-order/view-order.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    OrderDetailsComponent,
    ViewOrderComponent,
    
  ],
  imports: [
    
    MatTableModule,
    
    DataTablesModule,
    FormsModule,
    NgbModule, //NgbModule.forRoot(), 
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path:'', component: ProductsComponent},
      {path:'products', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},
      {path:'login', component: LoginComponent},

      {path:'check-out', component: CheckOutComponent, canActivate:[AuthGuard]},
      {path:'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuard]},
      {path:'view-order/:id', component: ViewOrderComponent, canActivate:[AuthGuard]},
      {path:'my/orders', component: MyOrderComponent, canActivate:[AuthGuard]},

      {path:'admin/products/new', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/products/:id', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGuard, AdminAuthGuard]}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
