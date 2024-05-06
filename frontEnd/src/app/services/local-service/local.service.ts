import { Injectable, signal } from '@angular/core';
import { Product } from '../../container/inicio/clases';
import { LocalEat } from './local-eat';


@Injectable({
  providedIn: 'root'
})
export class LocalService {


  // atributes: name, products[]

  // creando productos
  private productos = signal([
    new Product(1, 'Producto 1', "Descripción del producto 1",10, "assets/imagenes/producto1.jpg",2),
    new Product(2, 'Producto 2', "ya no somo", 200, "assets/imagenes/producto2.jpg",20),
    new Product(3, 'Producto 3', "Estoy bien", 100,"assets/imagenes/producto2.jpg", 2)
  ]);

  // create a two locals

  private locals =  signal([
    new LocalEat(1, "Donde mi Suego", this.productos(), "https://img.freepik.com/foto-gratis/surtido-plano-deliciosa-comida-brasilena_23-2148739179.jpg")
  ])

  getLocals(){
    return this.locals;
  }

  searchLocal(name:string) : LocalEat | undefined{
    let local = this.locals().find((local => local.getName() == name));
    return local;
  }
  constructor() { }
}
