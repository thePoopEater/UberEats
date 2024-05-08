import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from '../../class/local';
import { Product } from '../../container/inicio/clases';
import { ObjectMapper } from 'json-object-mapper';
const URL_LOCAL = "http://localhost:3000/local";
const URL_PRODUCTS = "http://localhost:3000/local/products/:";
const URL_PRODUCT = "http://localhost:3000/local/products/"
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http : HttpClient){  }


  
  getLocales(){
    return this.http.get<Local>(URL_LOCAL);
  }

  getProducts(id : string){
    return this.http.get<Product>(URL_PRODUCTS+id);
  }

  getProduct(id : string){
    return this.http.get<Product>(URL_PRODUCT+id)
  }
}
