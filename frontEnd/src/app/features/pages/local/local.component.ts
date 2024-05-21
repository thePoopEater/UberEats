import { Component, Input, OnInit, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalService } from '../../../core/services/local-service/local.service';
import { ProductosService } from '../../../core/services/producto-service/productos.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Local } from '../../../core/models/class/local';
import { Product } from '../../../core/models/class/product';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-local',
  standalone: true, 
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LocalComponent implements OnInit {





  constructor(private route: ActivatedRoute, private http : HttpClient, private localService : LocalService){
    
  }

  private localSer$ = inject(LocalService);
  private prodServ$ = inject(ProductosService);
  // Este hijo recibe el id del local
  private local_id : string = '';
  local!:Local;
  product : Product[] = [];
  @Input('idProd') idProduct! :string;
  
  ngOnInit() : void{
    
    this.route.params.subscribe( (params) => 
      {
        
        this.local_id = params['{idLocal}']
  
      });


    this.localSer$.getLocal(this.local_id).subscribe(
      (resp) => {
        console.log(this.local_id);
        console.log(resp);
        this.local = resp;
      }
    )
    // Se debe pedir todos los productos pertenecientes al local "no se como"
    this.prodServ$.getProductsFromLocal(this.local_id).subscribe(
      ( resp ) => {
        this.product = resp;
        console.log(this.product);
      }
    )


    
  }


}


  

  


