import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito-service/carrito.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  imports: [RouterLink]
})
export class PagoComponent implements OnInit {

  constructor() { }

  private readonly _cartService$ =inject(CarritoService); 

  ngOnInit() {
  }

  generateOrder(){
    
  }
}
