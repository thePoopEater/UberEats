import { Component, signal, inject } from '@angular/core';
import { Product } from '../../container/inicio/clases';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})



export class ProductoComponent {

  constructor(private route : ActivatedRoute, private http: HttpClient){}
  // Variables cantidad prod
  cant_prod = signal(1);
  button_plus_enable = true;
  button_sub_enable = true;
  // obtener de la base de datos el stock
  product_stock = 10;
  product : any;
  // info del producto
  price = 1000;
  total_price = this.price;
  product_id = 0;
  // test class product and send to cart
  url_product = "http://localhost:3000/product/";

  ngOnInit(){
    this.route.params.subscribe( (params) => this.product_id = params["product_id"]);
    this.http.get<any>(this.url_product +  this.product_id).subscribe(
      data =>{
        this.product = data;
       }
      )

  }

  addProductCant(){
    if(this.product_stock > 0 && this.product_stock > this.cant_prod()){
      this.button_sub_enable = true;
      this.cant_prod.set(this.cant_prod() + 1);
      this.total_price += this.price;
      console.log("cant dis: " + this.cant_prod);
      console.log("hola funciono");
    }else{
      this.button_plus_enable = false;
    }
  }

  subProductCant(){
    if(this.cant_prod() > 0){
      this.cant_prod.set(this.cant_prod() - 1);
      this.total_price -= this.price;
      console.log("funciona menos", this.cant_prod);
      if(!this.button_plus_enable){
        this.button_plus_enable = true;
      }
    }else{
      this.button_sub_enable = false;
    }
  }

  addProduct(id : number){
    console.log("funciona");
  }
  
}
