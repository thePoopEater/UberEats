import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { LocalService } from '../local-service/local.service';
const URL_BASE = "http://localhost:3000/product"
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  private products = inject(LocalService);

  getProducts(){
    console.log(this.http.get(URL_BASE))
  }

  


}
