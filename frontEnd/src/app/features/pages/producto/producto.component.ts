import { Component, signal, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Product } from "../../../core/models/class/product";
import { LocalService } from "../../../core/services/local-service/local.service";
import { ProductosService } from "../../../core/services/producto-service/productos.service";
import { OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CarritoService } from "../../../core/services/carrito-service/carrito.service";
import { FormsModule } from '@angular/forms';
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
    private http: HttpClient, 
    private _location : Location,
  ) {}

  // Recibir parametro producto


  // Variables cantidad prod
  cant_prod = signal(0);
  specifications = signal('');
  button_plus_enable = true;
  button_sub_enable = true;
  // obtener de la base de datos el stock
  product_stock = 10;
  product: Product = new Product;
  // info del producto
  price = 0;
  total_price = this.price;
  productId: string = '';
  // test class product and send to cart

  private productServ = inject(ProductosService);
  private cartSer$ = inject(CarritoService)

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        console.log(params);
        this.productId = params['{idProd}']
      

      }
    );
    this.productServ.getProduct(this.productId).subscribe((resp) => {
      this.product = resp;
      this.price = this.product.price;
    });

    // this.http.get<any>(this.url_product +  this.productId).subscribe(
    //   data =>{
    //     this.product = data;
    //    }
    //   )
  }

  toBack(){
    this._location.back();
  }
  addProductCant() {
    if (this.product_stock > 0 && this.product_stock > this.cant_prod()) {
      this.button_sub_enable = true;
      this.cant_prod.set(this.cant_prod() + 1);
      this.total_price += this.product.price;
      console.log("cant dis: " + this.cant_prod);
      console.log("hola funciono");
    } else {
      this.button_plus_enable = false;
    }
  }

  subProductCant() {
    if (this.cant_prod() > 0) {
      this.cant_prod.set(this.cant_prod() - 1);
      this.total_price -= this.product.price;
      console.log("funciona menos", this.cant_prod);
      if (!this.button_plus_enable) {
        this.button_plus_enable = true;
      }
    } else {
      this.button_sub_enable = false;
    }
  }

  addProductToCart() {
    if(this.cant_prod() > 0){
        this.cartSer$.addToCart(this.product, this.cant_prod(), this.specifications());
        console.log("funciona");
    }else{
      console.log(this.specifications());
      console.log("no hay productos seleccionados")
    }
  }
}
