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
import { Observable } from "rxjs";
import { JwtDecoderService } from "../jwt-decoder/jwt-decoder.service";
import { Product } from "../../models/class/product";
import { AuthService } from "../auth-service/auth.service";
@Injectable({
  providedIn: "root",
})
export class OrderService {
  // TODO: Eliminar esto despues
  orderPrueba: Order = {
    localId: 1,
    clientId: 1,
    date: new Date(),
    state: "Carrito",
    orderId: 1,
    payMethod: "Efectivo",
    amount: 100,
  } as Order;

  orderProductsPrueba: ProductOrder[] = [
    { quantity: 1, specification: "eolpp", orderId: 1, productId: 1 },
    { quantity: 1, specification: "eolpp", orderId: 1, productId: 2 },
  ];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: AuthService
  ) {}

  public createOrder(
    localId: number,
    clientId: number,
    product: Product
  ): Observable<Response<Order>> {
    const userToken = this.userService.getToken();
    const header = new HttpHeaders().set(
      "Authorization",
      `Bearer ${userToken}`
    );
    const order = new OrderCreateDTO(localId, clientId);
    return this.httpClient.post<Response<Order>>(env.URL_POST_ORDER, order, {
      headers: header,
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
  public getOrder(clientId: number): [Order, ProductOrder[]] {
    return [this.orderPrueba, this.orderProductsPrueba];
  }

  public clientHasOrder(clientId: number): boolean {
    return false;
  }
}
