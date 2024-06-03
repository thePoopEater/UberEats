import { Injectable, inject } from "@angular/core";
import { Order, OrderCreateDTO } from "../../models/class/orders";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { ProductOrder } from "../../models/class/product-order";
import { Response } from "../../models/class/response";
import { catchError, finalize, throwError } from "rxjs";
import { CarritoService } from "../carrito-service/carrito.service";
import { env } from "../../enviroment/enviroment";
@Injectable({
  providedIn: "root",
})
export class OrderService {

  private readonly _cartService$ = inject(CarritoService);
  constructor(private httpClient: HttpClient) {}

  public createOrder(
    localId: number,
    clientId: number,
    products: ProductOrder[]
  ) {
    let token = "";
    if (sessionStorage.getItem("accessToken") + "") {
      token = sessionStorage.getItem("accessToken") + "";
    }

    const header = new HttpHeaders().set('Autorization', 'Bearer ${token}');
    const order = new OrderCreateDTO(localId, clientId);
    this.httpClient
      .post<Response<Order>>(env.URL_POST_ORDER, order, {headers : header}
      )
      .subscribe((response) => {
        this.addProductsToOrder(products, response.data.orderId);
      });
  }

  public async addProductToOrder(orderProduct: ProductOrder) {
    return this.httpClient
      .post<ProductOrder>(env.URL_POST_ORDER_PRODUCT, orderProduct)
      .pipe(catchError(this.handleError));
  }

  public async addProductsToOrder(
    order_products: ProductOrder[],
    order_id: number
  ) {
    order_products.forEach((product) => {
      product.orderId = order_id;
      this.addProductToOrder(product);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error("An error occurred:", error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
