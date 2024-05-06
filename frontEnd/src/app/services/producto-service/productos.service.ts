import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { LocalService } from '../local-service/local.service';
const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private http = inject(HttpClient);

  getPosts(){
    return this.http.get(BASE_URL);
  }


  constructor() { }

  private products = inject(LocalService);

  


}
