import { ProductOrder } from "./product-order";
import { BehaviorSubject, Observable } from "rxjs";
export class Cart {


    private _listOrderProds:BehaviorSubject<ProductOrder[]> = new BehaviorSubject<ProductOrder[]>([]); 
    
    private _productOrders : Observable<ProductOrder[]> = this._listOrderProds.asObservable();

    constructor(){
        return this;
    }


    addToCart(product : ProductOrder, price : number){
        this._listOrderProds.subscribe( (prodOrds) => {
            prodOrds.push(product);
            console.log(prodOrds);
        }
    )
    }

    deleteProduct(id_prod : number){
        this._productOrders.subscribe( (prodOrds) => {
            prodOrds = prodOrds.filter(product => product.productId == id_prod)
            console.log(prodOrds);
        })
    }



    getCart() : ProductOrder[]{
        let  prodOrders : ProductOrder[] = [];
        this._listOrderProds.subscribe( (prodOrds) => {
            if(prodOrds === null){
                prodOrders = [];
            }else{
                prodOrders = prodOrds;
            }
            console.log(prodOrds)
        });
        return prodOrders;
    }

    getProductOrder() : BehaviorSubject<ProductOrder[]> {
        return this._listOrderProds;
    }



    
    
}