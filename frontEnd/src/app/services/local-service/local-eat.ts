import { Product } from "../../container/inicio/clases";

export class LocalEat {

    private _id : number;
    private _name : string;
    private _products : Product[];
    private _img : string;
    
    constructor(id:number, name : string, product_list: Product[], img:string){
        this._id = id;
        this._name = name;
        this._products = product_list;
        this._img = img;
    }
    addProduc(prod : Product){
        this._products.push(prod);
    }

    getId(){
        return this._id
    }
    getName(){
        return this._name
    }

    getImg(){
        return this._img;
    }

    getProducts() : Product[]{
        return this._products;
    }


}