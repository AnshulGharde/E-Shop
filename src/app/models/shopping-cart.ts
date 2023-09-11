import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    
    constructor(public items: ShoppingCartItem[]){
        
    }
    get productIDs(){
        return Object.keys(this.items);
    }
   
}

