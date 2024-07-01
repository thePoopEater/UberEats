import { Component, inject } from '@angular/core';
import { LocalService } from '../../../../core/services/local-service/local.service';
import { JwtDecoderService } from '../../../../core/services/jwt-decoder/jwt-decoder.service';
import { Order } from '../../../../core/models/class/orders';
import { CommonModule } from '@angular/common';
import { ProductOrder, ProductOrderResponse } from '../../../../core/models/class/product-order';

@Component({
  selector: 'app-ver-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-pedidos.component.html',
  styleUrl: './ver-pedidos.component.css'
})
export default class VerPedidosComponent {


  private readonly _localService$ = inject(LocalService);
  private readonly _jwtDecoderService$ = inject(JwtDecoderService);

  private idLocal!:number;
  public orderSelect! : Order;
  public products!: ProductOrderResponse[];
  public showDetails : boolean = false;
  public color = '';

  public orderLocal : Order[] = [];
  private readonly token : string = sessionStorage.getItem('Token')!;
  private readonly idAdmin : number = this._jwtDecoderService$.decodetoken(this.token).sub
  ngOnInit(){
    this._localService$.getLocalFromAdmin(this.idAdmin).subscribe(
      (data) => {
        this.idLocal = data.id;
        this._localService$.getOrdersFromLocal(this.idLocal, this.token).subscribe(
          (orders) => {
            this.orderLocal = orders;
          }
         );
      }
    )

    console.log(this.orderLocal);

  }

  public verDetalles(idOrder : number)
  {
    console.log("id order:",idOrder);
    this._localService$.getOrder(idOrder, this.token).subscribe(
      (data) => {
        this.orderSelect = data;
        console.log(this.orderSelect);
      }
    )
    this.color = '#8c8c8c'
    this._localService$.getProductsFromOrder(idOrder, this.token).subscribe(
       (data)=> {
         this.products = data;
         console.log(this.products);
       }
     )

    this.showDetails = true;
  }

  public close() {
    this.showDetails = false;
  }

  public cancelarOrden(idOrder : number){
    this._localService$.delOrder(idOrder, this.token);
    this.orderSelect = new Order();

    this._localService$.getOrdersFromLocal(this.idAdmin, this.token).subscribe(
      (data ) => {
        this.orderLocal = data;
      }
    )
    this.showDetails = false;
  }
}
