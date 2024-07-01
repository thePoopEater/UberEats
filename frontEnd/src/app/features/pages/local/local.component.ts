import { Component, Input, OnInit, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocalService } from "../../../core/services/local-service/local.service";
import { ProductosService } from "../../../core/services/producto-service/productos.service";
import { RouterLink } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Local } from "../../../core/models/class/local";
import { Product } from "../../../core/models/class/product";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-local",
  standalone: true,
  templateUrl: "./local.component.html",
  styleUrls: ["./local.component.css"],
  imports: [CommonModule, RouterLink],
})
export class LocalComponent implements OnInit {
  // Este hijo recibe el id del local
  private local_id: string = "";
  local: Local = new Local();
  products: Product[] = [];
  isCartEmpty: boolean = false;

  @Input("idProd") idProduct!: string;
  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductosService,
    private readonly localService: LocalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.local_id = params["{idLocal}"];
    });

    this.localService.getLocal(this.local_id).subscribe((resp) => {
      this.local = resp;
    });
    // Se debe pedir todos los productos pertenecientes al local "no se como"

    this.productService
      .getProductsFromLocal(this.local_id)
      .subscribe((products_response) => {
        this.products = products_response;
      });

    this.isCartEmpty = true;
  }

  goToCart() {
    this.router.navigate(["/carrito"]);
  }
}
