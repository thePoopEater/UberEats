import { Component } from "@angular/core";
import { OrderService } from "../../../core/services/order-service/order.service";
import { Order } from "../../../core/models/class/orders";
import { CommonModule } from "@angular/common";
import { ProductsFromOrder } from "../../../core/models/class/ProductsFromOrder";
import { Product } from "../../../core/models/class/product";
import { OrderWithProducts } from "../../../core/models/class/OrderWithProducts";
import { AuthService } from "../../../core/services/auth-service/auth.service";

@Component({
  selector: "app-deliver",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./deliver.component.html",
  styleUrl: "./deliver.component.css",
})
export class DeliverComponent {
  orders: OrderWithProducts[] = [];
  constructor(
    private orderService: OrderService,
    private deliveryService: AuthService
  ) {}
  async ngOnInit() {
    const orders = await this.orderService.getPendingOrders();

    for (let order of orders) {
      let productsFromOrder = await this.orderService.getProductsFromOrder(
        order.orderId
      );
      this.orders.push({
        order: order,
        productsOrder: productsFromOrder,
      } as OrderWithProducts);
    }
  }

  public selectOrder(orderId: number) {
    this.orderService
      .acceptOrderFromDelivery(
        orderId,
        this.deliveryService.getTokenDecoded().sub
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  public async getLocalFromOrder() {}
}
