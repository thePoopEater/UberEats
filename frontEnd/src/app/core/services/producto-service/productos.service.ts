import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { LocalService } from '../local-service/local.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/class/product';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
  private readonly URL_ALL_PRODS_FROM_LOCAL = "http://localhost:3000/local/products/:";
  private readonly URL_PROD = "http://localhost:3000/product/";


  getProductsFromLocal(localId : string) : Observable<Product[]>{
    return this.http.get<Product[]>(this.URL_ALL_PRODS_FROM_LOCAL + localId);
    
  }
  
  getProduct(prodId : string) : Observable<Product>{
    return this.http.get<Product>(this.URL_PROD + prodId)
  } 


}
