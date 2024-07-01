import { Component, OnInit, WritableSignal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { OrderService } from "../../../core/services/order-service/order.service";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { Address } from "../../../core/models/class/address";
import { OrderWithProducts } from "../../../core/models/class/OrderWithProducts";
@Component({
  selector: "app-carrito",
  standalone: true,
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"],
  imports: [CommonModule, RouterLink],
})
export class CarritoComponent implements OnInit {
  orderWithProducts: OrderWithProducts = new OrderWithProducts();
  addresses: Address[] = [];
  total: number = 0;
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: AuthService
  ) {}

  async ngOnInit() {
    const order = await this.orderService.getOrder(
      this.userService.getTokenDecoded().sub
    );
    this.orderWithProducts.order = order[0];
    this.orderWithProducts.productsOrder = order[1];

    for (let product of this.orderWithProducts.productsOrder) {
      this.total += product.product_price * product.orderProduct_quantity;
    }
    this.userService
      .getAddresses(this.userService.getTokenDecoded().sub)
      .subscribe((address) => {
        this.addresses = address;
        console.log(this.addresses);
      });
  }

  public async confirmOrder(address: string, payMethod: string) {
    console.log(address, payMethod);
    console.log(
      (
        await this.orderService.confirmOrder(
          this.orderWithProducts.order.orderId,
          address,
          payMethod
        )
      ).subscribe((response) => {
        console.log(response);
      })
    );
  }

  emptyCart() {
    this.orderService
      .cancelOrder(this.orderWithProducts.order.orderId)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
