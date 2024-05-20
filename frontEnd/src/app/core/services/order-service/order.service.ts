import { Injectable } from '@angular/core';
import { Order } from '../../models/class/orders';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_POST_ORDER          = 'http://localhost:3000/order';
  private URL_GET_ORDER           = 'http://localhost:3000/order/';
  private URL_POST_ORDER_PRODUCT  = 'http://localhost:3000/order-product';

  constructor(private httpClients : HttpClient) { }

  
}
