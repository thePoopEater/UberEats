import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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
}
