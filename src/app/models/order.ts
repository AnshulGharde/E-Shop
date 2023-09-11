import { orderDate } from './orderDate';
import { ShoppingCart } from './shopping-cart';
import { Shipping } from './shipping';
export class Order{
    
    datePlaced:number;//= new orderDate();
    items;

    public key:string ="";

    constructor( public userID: string, public shipping: Shipping, cart: ShoppingCart,public totalPrice: number ){
        // this.datePlaced.date = new Date().getDate();
        
        // this.datePlaced.month = new Date().getMonth();
        // this.datePlaced.year = new Date().getFullYear();
        this,this.datePlaced = new Date().getTime();
        
        this.items = cart.items;
    }
}