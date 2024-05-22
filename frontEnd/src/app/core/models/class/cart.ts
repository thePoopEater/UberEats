import { ProductOrder } from "./product-order";
export class Cart {


    private _listProds:ProductOrder[] = []; 
    private _total:number = 0;
    
    constructor(){
        return this;
    }


    addToCart(product : ProductOrder, price : number){
        this._listProds.push(product);
        this._total+= price;
    }

    deleteProduct(id_prod : number){
        this._listProds = this._listProds.filter(product => product.productId == id_prod)
    }


    getTotal() : number {
        return this._total;
    }

    getCart() : ProductOrder[]{
        return this._listProds;
    }



    
    
}