import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../../container/inicio/clases';
import { Signal } from '@angular/core';
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

  private productos = signal([
    new Product(1, 'Producto 1', "Tomas silva",10, "assets/imagenes/producto1.jpg",2),
    new Product(2, 'Producto 2', "ya no somo", 200, "assets/imagenes/producto2.jpg",20),
    new Product(3, 'Producto 3', "Estoy bien", 100,"assets/imagenes/producto2.jpg", 2)
  ]);

  getProducts() {
    return this.productos();
  }


}
