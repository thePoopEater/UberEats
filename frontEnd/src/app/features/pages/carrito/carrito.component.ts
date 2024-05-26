import { Component, OnInit, WritableSignal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CarritoService } from "../../../core/services/carrito-service/carrito.service";
import { Product } from "../../../core/models/class/product";
import { ProductOrder } from "../../../core/models/class/product-order";
import { BehaviorSubject } from "rxjs";
import { signal } from "@angular/core";
@Component({
  selector: "app-carrito",
  standalone: true,
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"],
  imports: [CommonModule, RouterLink],
})
export class CarritoComponent implements OnInit {
  private cartService$ = inject(CarritoService);

  listaProd: WritableSignal<Product[]> = signal([]);
  listaOrderProd: WritableSignal<ProductOrder[]> = signal([]);
  public total: number = 0;

  constructor() {}

  ngOnInit() {
    this.listaProd.set(this.cartService$.getProductsCart());
    this.listaOrderProd.set(this.cartService$.getCart().getCart());
    this.total = this.cartService$.total;
  }
  addToCart() {}

  deleteFromCart() {}
  emptyCart() {
    this.cartService$.cleanShoppingCart();
  }
}
