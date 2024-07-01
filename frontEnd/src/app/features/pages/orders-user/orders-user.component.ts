import { Component } from "@angular/core";
import { Order } from "../../../core/models/class/orders";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { OrderService } from "../../../core/services/order-service/order.service";
import { CommonModule } from "@angular/common";
import { lastValueFrom } from "rxjs";
import { OrderWithProducts } from "../../../core/models/class/OrderWithProducts";

@Component({
  selector: "app-orders-user",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./orders-user.component.html",
  styleUrl: "./orders-user.component.css",
})
export class OrdersUserComponent {
  ordersWithProducts: OrderWithProducts[] = [];

  constructor(
    private userService: AuthService,
    private orderService: OrderService
  ) {}
  async ngOnInit() {
    const orders = await lastValueFrom(
      this.orderService.getOrders(this.userService.getTokenDecoded().sub)
    );
    for (let order of orders) {
      let products = await this.orderService.getProductsFromOrder(
        order.orderId
      );

      this.ordersWithProducts.push({
        order: order,
        productsOrder: products,
      } as OrderWithProducts);
    }
    console.log(this.ordersWithProducts);
  }
}
