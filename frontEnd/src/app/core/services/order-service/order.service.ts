import { Injectable, inject} from '@angular/core';
import { Order, OrderCreateDTO } from '../../models/class/orders';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProductOrder } from '../../models/class/product-order';
import { ResponseDTO } from '../../models/class/response';
import { catchError, finalize, throwError } from 'rxjs';
import { CarritoService } from '../carrito-service/carrito.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_POST_ORDER          = 'http://localhost:3000/order';
  private URL_GET_ORDER           = 'http://localhost:3000/order/';
  private URL_POST_ORDER_PRODUCT  = 'http://localhost:3000/order-product';
  private readonly _cartService$ = inject(CarritoService);
  constructor(private httpClient : HttpClient) { }

  public createOrder(
    localId : number,
    clientId : number,
    products: ProductOrder[]
  ){
    let token = '';
    if(sessionStorage.getItem('token')+''){
      token = sessionStorage.getItem('token')+'';
      console.log("el token", token);
    }

    const headers = new HttpHeaders().set('Autorization', 'Bearer ${token}');
    const order = new  OrderCreateDTO(localId, clientId);
    this.httpClient
    .post<ResponseDTO<Order>>(this.URL_POST_ORDER, order, {
      headers : headers,
    })
    .subscribe( (response) => {
      this.addProductsToOrder(products, response.data.orderId)
    })
  }
  
  public async addProductToOrder(orderProduct : ProductOrder){
    return this.httpClient
      .post<ProductOrder>(this.URL_POST_ORDER_PRODUCT, orderProduct)
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
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }


}
