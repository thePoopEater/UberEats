import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { LocalService } from '../local-service/local.service';
const URL_ALL_PRODS = "http://localhost:3000/product";
const URL_PROD = "http://localhost:3000/product/:";
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  private products = inject(LocalService);

  getProducts(){
    console.log(this.http.get(URL_ALL_PRODS))
  }

  getProduct(id : string){
    return this.http.get(URL_PROD + id);
  }
  


}
