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
import { ProductsFromOrder } from "../../../core/models/class/ProductsFromOrder";
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
  order: [Order, ProductsFromOrder[]] = [new Order(), []];
  total: number = 0;
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: AuthService
  ) {}

  async ngOnInit() {
    this.order = await this.orderService.getOrder(
      this.userService.getTokenDecoded().sub
    );

    for (let product of this.order[1]) {
      this.total += product.product_price * product.orderProduct_quantity;
    }
  }

  async confirmOrder() {
    console.log(
      (await this.orderService.confirmOrder(this.order[0].orderId)).subscribe(
        (response) => {
          console.log(response);
        }
      )
    );
  }
  addToCart() {}
  deleteFromCart() {}
  emptyCart() {}
}
