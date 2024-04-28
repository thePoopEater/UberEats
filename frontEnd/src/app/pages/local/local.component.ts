import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-local',
  standalone: true, 
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [CommonModule]
})
export class LocalComponent implements OnInit {

  productos = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 10, imagenUrl: "assets/imagenes/producto1.jpg" },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 20, imagenUrl: "assets/imagenes/producto2.jpg" },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}


  

  


