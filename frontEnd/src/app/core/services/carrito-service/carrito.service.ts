import { Injectable, inject } from "@angular/core";
import { Cart } from "../../models/class/cart";
import { Product } from "../../models/class/product";
import { ProductOrder } from "../../models/class/product-order";
import { ProductoComponent } from "../../../features/pages/producto/producto.component";
import { Location } from "@angular/common";
import { ProductosService } from "../producto-service/productos.service";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { env } from "../../enviroment/enviroment";
@Injectable({
  providedIn: "root",
})
export class CarritoService {
  private LOCAL_STORAGE_PRODUCT_KEY = "products";

  constructor(private readonly httpClient: HttpClient) {}

  public getCarrito() {
    this.httpClient.get<ProductOrder>(env.URL_GET_ORDER);
    console.log();
  }

  public createCarrito() {
    //this.httpClient.post(env.URL_POST_ORDER);
  }

  public addToCarrito() {}
}
