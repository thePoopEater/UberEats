import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CarritoService } from "../../../core/services/carrito-service/carrito.service";
import { Product } from "../../../core/models/class/product";
import { ProductOrder } from "../../../core/models/class/product-order";
@Component({
  selector: "app-carrito",
  standalone: true,
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"],
  imports: [CommonModule, RouterLink],
})
export class CarritoComponent implements OnInit {
  private cartService$ = inject(CarritoService);
  listaProd: Product[] = [];
  listaOrderProd: ProductOrder[] = [];
  total: number = 0;

  constructor() {}

  ngOnInit() {
    this.listaProd = this.cartService$.getProductsCart();
    this.listaOrderProd = this.cartService$.getCart().getCart();
    this.total = this.cartService$.total;
  }
}
