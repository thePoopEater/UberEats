import { Injectable, inject } from "@angular/core";
import { Order, OrderCreateDTO } from "../../models/class/orders";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { ProductOrder } from "../../models/class/product-order";
import { Response } from "../../models/class/response";
import {
  catchError,
  finalize,
  firstValueFrom,
  lastValueFrom,
  throwError,
} from "rxjs";
import { CarritoService } from "../carrito-service/carrito.service";
import { env } from "../../enviroment/enviroment";
import { Observable } from "rxjs";
import { JwtDecoderService } from "../jwt-decoder/jwt-decoder.service";
import { Product } from "../../models/class/product";
import { AuthService } from "../auth-service/auth.service";
import { ProductsFromOrder } from "../../models/class/ProductsFromOrder";
import { ProductosService } from "../producto-service/productos.service";
@Injectable({
  providedIn: "root",
})
export class OrderService {
  // TODO: Eliminar esto despues
  orders: Order[] = [];
  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: AuthService,
    private readonly productService: ProductosService
  ) {}

  public createOrder(
    localId: number,
    clientId: number
  ): Observable<Response<Order>> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    const order = new OrderCreateDTO(localId, clientId);
    console.log(order);
    return this.httpClient.post<Response<Order>>(env.URL_POST_ORDER, order, {
      headers: headers,
    });
  }

  public async addProductToOrder(
    orderProduct: ProductOrder
  ): Promise<ProductOrder> {
    const response = await firstValueFrom(
      this.httpClient
        .post<ProductOrder>(env.URL_POST_ORDER_PRODUCT, orderProduct)
        .pipe(catchError(this.handleError))
    );
    return response;
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
  public async getOrder(
    clientId: number
  ): Promise<[Order, ProductsFromOrder[]]> {
    let carrito_order: Order = new Order();
    let order_products;
    try {
      this.orders = await lastValueFrom(this.getOrders(clientId));
    } catch (error) {
      console.error(error);
    }
    console.log(this.orders);
    if (this.orders) {
      for (let order of this.orders) {
        console.log(order);
        if (order.state == "Carrito") {
          carrito_order = order;
        }
      }
    }
    order_products = await this.getProductsFromOrder(carrito_order.orderId);
    return [carrito_order, order_products];
  }

  public async confirmOrder(order_id: number): Promise<Observable<any>> {
    let amount: number = 0;
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const products: ProductsFromOrder[] = await this.getProductsFromOrder(
      order_id
    );
    for (let product of products) {
      amount += product.orderProduct_quantity * product.product_price;
    }
    return this.httpClient.put<any>(
      env.ULR_PUT_ORDER + order_id,
      { state: "Pending", amount: amount },
      { headers: headers }
    );
  }

  public async getProductsFromOrder(
    order_id: number
  ): Promise<ProductsFromOrder[]> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const response: ProductsFromOrder[] = await lastValueFrom(
      this.httpClient.get<ProductsFromOrder[]>(
        env.URL_GET_ORDER_PRODUCTS + order_id,
        { headers: headers }
      )
    );
    return response;
  }

  public async clientHasOrder(clientId: number): Promise<boolean> {
    try {
      this.orders = await lastValueFrom(this.getOrders(clientId));
    } catch (error) {
      console.error(error);
    }
    console.log(this.orders);
    if (this.orders) {
      for (let order of this.orders) {
        console.log(order);
        if (order.state == "Carrito") {
          return true;
        }
      }
    }
    return false;
  }
  public getOrders(userId: number): Observable<Order[]> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.httpClient.get<Order[]>(env.URL_ORDERS_USER + userId, {
      headers: headers,
    });
  }
  public updateProductOrder(productOrder: ProductOrder, product_id: number) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.httpClient.put(
      env.URL_PUT_ORDER_PRODUCT + product_id,
      {
        quantity: productOrder.quantity,
        specification: productOrder.specification,
      },
      { headers: headers }
    );
  }
}
