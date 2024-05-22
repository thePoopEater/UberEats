import { Injectable } from "@angular/core";
import { Cart } from "../../models/class/cart";
import { Product } from "../../models/class/product";
import { ProductOrder } from "../../models/class/product-order";
import { ProductoComponent } from "../../../features/pages/producto/producto.component";
import { Location } from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

constructor(private local : Location) { }


  private _cart:Cart = new Cart();
  private isEmpty : boolean = true;

  private searchIncidence(idProd : number) : number {
    let i :  number = 0;
    let find : number = 0;
    console.log("lista de ordenes: ", this._cart.getCart());
    console.log("tamaño de ordenes lista: ", this._cart.getCart().length);

    while(i < this._cart.getCart().length){
        let orderList : ProductOrder[] = this._cart.getCart();
        console.log('ordenes: ', orderList[i]);
        if(orderList[i].productId == idProd){
          find = i;
        }
        i++;
    }

    return find;
  }

  public addToCart(product : Product, cant : number, specification : string) : void{
    let incidence = this.searchIncidence(product.productId);
    console.log(incidence);
    if( incidence == 0){

      let productOrder : ProductOrder = new ProductOrder(
        cant,
        specification,
        product.productId,
      )
      this._cart.addToCart(productOrder, product.price);
      console.log(this._cart);
      this.isEmpty = false;
    }else{
      this._cart.getCart()[incidence].quantity =+ cant;
    }

    this.local.back();
  }

  public delToCart(idProd : number){
    this._cart.deleteProduct(idProd);
  }

  public getCart(){
    return this._cart;
  }
}
