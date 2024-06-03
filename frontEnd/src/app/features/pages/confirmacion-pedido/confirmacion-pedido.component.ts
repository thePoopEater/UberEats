import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order-service/order.service';
import { CarritoService } from '../../../core/services/carrito-service/carrito.service';
import { Product } from '../../../core/models/class/product';
import { ProductOrder } from '../../../core/models/class/product-order';

@Component({
  selector: 'app-confirmacion-pedido',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirmacion-pedido.component.html',
  styleUrls: ['./confirmacion-pedido.component.css']
})
export class ConfirmacionPedidoComponent implements OnInit {
  countdown: number = 7;
  progressWidth: number = 0;
  countdownString: string = '00:07';
  interval: any;

  constructor(private router: Router) {}

  private readonly _orderService$ = inject(OrderService);
  private readonly _cartService$ = inject(CarritoService);
  
  listProds : Product[] = [];
  ngOnInit() {
    this.startTimer();
    this.listProds = this._cartService$.getProductsCart();
  }

  generateAnOrder(){
    if(sessionStorage.getItem('client_id') + ''){
      let clientId : number = parseInt(sessionStorage.getItem('client_id')+'');
      let prodOfCart : Product[] = this._cartService$.getProductsCart();
      let preOrderOfCart : ProductOrder[] = this._cartService$.getCart().getCart();

      console.log("Productos del carrito: ", prodOfCart);
      console.log("ordenes del carrito:", preOrderOfCart);
      // necesito el clientId, está invalido
      const orderResponse = this._orderService$.createOrder(1, clientId,  preOrderOfCart).subscribe((response) => {
        this._orderService$.addProductsToOrder(preOrderOfCart, response.data.orderId);
      });


      
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.countdown--;
      this.progressWidth = ((9 - this.countdown) / 7) * 100;
      this.countdownString = this.formatTime(this.countdown);

      if(this._cartService$.getCart.length > 0){

        if (this.countdown < 0) {
          clearInterval(this.interval);
          this.generateAnOrder();
          this.router.navigate(['/seguimiento-pedido']);
        }else{
          console.log('carrito vacio papu 8)');
        }
      }
    }, 1000);
  }

  cancelarPedido() {
    clearInterval(this.interval);
    this.router.navigate(['/pagos']);
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }

  
}
