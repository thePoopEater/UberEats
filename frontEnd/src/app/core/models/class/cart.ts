import { Product } from "./product";

export class Cart {


    private _listProds:Product[] = []; 
    private _total:number = 0;
    
    constructor(total: number ){
        return this;
    }


    addToCart(product : Product){
        this._listProds.push(product);
        this._total+= product.price;
    }

    deleteProduct(id_prod : number){
    }

    getTotal() : number {
        return this._total;
    }

    getCart() : Product[]{
        return this._listProds;
    }



    
    
}