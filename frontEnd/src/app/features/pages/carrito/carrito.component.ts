import { Component, OnInit, WritableSignal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CarritoService } from "../../../core/services/carrito-service/carrito.service";
import { Product } from "../../../core/models/class/product";
import { ProductOrder } from "../../../core/models/class/product-order";
import { BehaviorSubject } from "rxjs";
import { signal } from "@angular/core";
import { OrderService } from "../../../core/services/order-service/order.service";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { JwtDecoderService } from "../../../core/services/jwt-decoder/jwt-decoder.service";
import { Order } from "../../../core/models/class/orders";
import { JwtData } from "../../../core/models/data-jwt";
@Component({
  selector: "app-carrito",
  standalone: true,
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"],
  imports: [CommonModule, RouterLink],
})
export class CarritoComponent implements OnInit {
  products: Product[] = [];
  orderProducts: ProductOrder[] = [];
  order: [Order, ProductOrder[]];
  total: number = 0;

  constructor(
    private readonly orderService: OrderService,
    private readonly userService: AuthService
  ) {
    this.order = this.orderService.getOrder(
      this.userService.getTokenDecoded().sub
    );
  }

  ngOnInit() {}

  addToCart() {}
  deleteFromCart() {}
  emptyCart() {}
}
