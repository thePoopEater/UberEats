import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { OrderService } from "../../../core/services/order-service/order.service";
import { lastValueFrom } from "rxjs";
import { OrderWithProducts } from "../../../core/models/class/OrderWithProducts";

@Component({
  selector: "app-orders-deliver",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./orders-deliver.component.html",
  styleUrl: "./orders-deliver.component.css",
})
export class OrdersDeliverComponent {
  ordersWithProducts: OrderWithProducts[] = [];
  constructor(
    private userService: AuthService,
    private orderService: OrderService
  ) {}
  async ngOnInit() {
    const orders = await this.orderService.getOrdersDeliver(
      this.userService.getTokenDecoded().sub
    );
    console.log(orders);

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
