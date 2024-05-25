import { Injectable, inject } from "@angular/core";
import { Cart } from "../../models/class/cart";
import { Product } from "../../models/class/product";
import { ProductOrder } from "../../models/class/product-order";
import { ProductoComponent } from "../../../features/pages/producto/producto.component";
import { Location } from "@angular/common";
import { ProductosService } from "../producto-service/productos.service";
@Injectable({
  providedIn: "root",
})
export class CarritoService {
  constructor(private local: Location) {}

  private _orderId: number = 0;
  private _cart: Cart = new Cart();
  public isCartWithOrder: boolean = false;
  private productServ$ = inject(ProductosService);
  public total: number = 0;

  private searchIncidence(idProd: number, desc: string): number {
    let i: number = 0;
    let find: number = -1;
    while (i < this._cart.getCart().length) {
      let orderList: ProductOrder[] = this._cart.getCart();
      let product: ProductOrder = orderList[i];
      if (product.productId == idProd && product.specification == desc) {
        find = i;
      }
      i++;
    }
    return find;
  }

  public addToCart(
    product: Product,
    cant: number,
    specification: string
  ): void {
    let incidence = this.searchIncidence(product.productId, specification);
    if (incidence == -1) {
      this._orderId++;
      let productOrder: ProductOrder = new ProductOrder(
        cant,
        specification,
        product.productId,
        this._orderId
      );
      this._cart.addToCart(productOrder, product.price);
      this.isCartWithOrder = true;
      this.total += cant * product.price;
    } else {
      this._cart.getCart()[incidence].quantity =
        this._cart.getCart()[incidence].quantity + cant;
      this.total += cant * product.price;
    }

    this.local.back();
  }

  public delToCart(idProd: number) {
    this._cart.deleteProduct(idProd);
  }

  public getCart() {
    return this._cart;
  }

  public getProductsCart(): Product[] {
    let productsList: Product[] = [];
    let orderList: ProductOrder[] = this._cart.getCart();
    let producto: Product;
    for (let i = 0; i < orderList.length; i++) {
      this.productServ$
        .getProduct(orderList[i].productId.toString())
        .subscribe((param) => {
          producto = param;
          productsList.push(producto);
        });
    }
    return productsList;
  }
}
