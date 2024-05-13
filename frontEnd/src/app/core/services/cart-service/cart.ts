import { Product } from "../../container/inicio/clases";

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
        let index : number = this.binarySearch(id_prod, this._listProds);
        this._listProds.splice(index, 1);
    }

    getTotal() : number {
        return this._total;
    }

    getCart() : Product[]{
        return this._listProds;
    }

    binarySearch(value : number, list : Product[]) : number{
        let first = 0;    //left endpoint 
        let last = list.length - 1;   //right endpoint 
        let position = -1;
        let found = false;
        let middle;
        while (found === false && first <= last) {
            middle = Math.floor((first + last)/2);
            if (list[middle].id == value) {
                found = true;
                position = middle;
            } else if (list[middle].id > value) {  //if in lower half 
                last = middle - 1;
            } else {  //in in upper half 
                first = middle + 1;
            }
        }
        return position;
    }

    
    
}