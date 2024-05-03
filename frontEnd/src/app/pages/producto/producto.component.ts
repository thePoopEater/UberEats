import { Component } from '@angular/core';
import { Product } from '../../container/inicio/clases';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})



export class ProductoComponent {

  // Variables cantidad prod
  cant_prod = 1;
  button_plus_enable = true;
  button_sub_enable = true;
  // obtener de la base de datos el stock
  product_stock = 10;

  // info del producto
  price = 1000;
  total_price = this.price;

  // test class product and send to cart
  producto : Product = new Product(12, 'completo', 'tiene mayo ajo', 10);

  addProductCant(){
    if(this.product_stock > 0 && this.product_stock > this.cant_prod){
      this.button_sub_enable = true;
      this.cant_prod++;
      this.total_price += this.price;
      console.log("cant dis: " + this.cant_prod);
      console.log("hola funciono");
    }else{
      this.button_plus_enable = false;
    }
  }

  subProductCant(){
    if(this.cant_prod > 0){
      this.cant_prod--;
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
