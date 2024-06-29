import { Component, signal, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Product } from "../../../core/models/class/product";
import { LocalService } from "../../../core/services/local-service/local.service";
import { ProductosService } from "../../../core/services/producto-service/productos.service";
import { OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CarritoService } from "../../../core/services/carrito-service/carrito.service";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../../core/services/order-service/order.service";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { ProductOrder } from "../../../core/models/class/product-order";
import { JwtDecoderService } from "../../../core/services/jwt-decoder/jwt-decoder.service";
import { jwtDecode } from "jwt-decode";
import { JwtData } from "../../../core/models/data-jwt";
import { firstValueFrom } from "rxjs";
import { Order } from "../../../core/models/class/orders";
@Component({
  selector: "app-producto",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./producto.component.html",
  styleUrl: "./producto.component.css",
})
export class ProductoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private productService: ProductosService,
    private orderService: OrderService,
    private userService: AuthService,
    private jwtDecoder: JwtDecoderService
  ) {}

  // Recibir parametro producto

  // Variables cantidad prod
  cant_prod = 1;
  specifications = "";
  button_plus_enable = true;
  button_sub_enable = true;
  // obtener de la base de datos el stock
  product_stock = 10;
  product: Product = new Product();
  // info del producto
  price = 0;
  total_price = this.price;
  productId: number = 0;
  // test class product and send to cart

  private cartSer$ = inject(CarritoService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params["{idProd}"];
    });
    this.productService.getProduct(this.productId).subscribe((resp) => {
      this.product = resp;
      this.price = this.product.price;
    });
  }

  toBack() {
    this._location.back();
  }
  addProductCant() {
    if (this.product_stock > 0 && this.product_stock > this.cant_prod) {
      this.button_sub_enable = true;
      this.cant_prod = this.cant_prod + 1;
      this.total_price += this.product.price;
    } else {
      this.button_plus_enable = false;
    }
  }

  subProductCant() {
    if (this.cant_prod > 0) {
      this.cant_prod = this.cant_prod - 1;
      this.total_price -= this.product.price;
      if (!this.button_plus_enable) {
        this.button_plus_enable = true;
      }
    } else {
      this.button_sub_enable = false;
    }
  }

  async addProductToCart() {
    const jwtDecode: JwtData = this.userService.getTokenDecoded();
    const userId = jwtDecode.sub;
    const local_id = 1;
    // Si el usuario ya tiene una order, busca la orden y agrega este producto a esa orden
    if (this.orderService.clientHasOrder(userId)) {
      const order: Order = this.orderService.getOrder(userId)[0];
      const order_id: number = order.orderId;

      const orderProduct = new ProductOrder(
        this.cant_prod,
        this.specifications,
        this.productId,
        order_id
      );
      this.orderService.addProductToOrder(orderProduct);
      // Si no tiene una orden crea un orden con el producto que acaba de agregar
    } else {
      const response = await firstValueFrom(
        this.orderService.createOrder(userId, local_id, this.product)
      );
      console.log(response);
    }
  }
}
