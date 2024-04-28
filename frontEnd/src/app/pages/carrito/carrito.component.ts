import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule]
})
export class CarritoComponent implements OnInit {

  productos = [
    { nombre: 'Producto 1', precio: 10, imagenUrl: "assets/imagenes/producto1.jpg", cantidad: 2 },
    { nombre: 'Producto 2', precio: 20, imagenUrl: "assets/imagenes/producto2.jpg", cantidad: 3 },
    { nombre: 'Producto 3', precio: 30, imagenUrl: "assets/imagenes/producto2.jpg", cantidad: 1 }
  ];

  constructor() { }

  ngOnInit() {
  }

}
