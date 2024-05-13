import { Component, Input, OnInit, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalService } from '../../../core/services/local-service/local.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product, Local } from '../inicio/clases';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-local',
  standalone: true, 
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LocalComponent implements OnInit {



  private localSer = inject(LocalService);
  // Este hijo recibe el id del local
  local_id : string = '';
  local : any;
  product : any;
  constructor(private route: ActivatedRoute, private http : HttpClient, private localService : LocalService){
    
  }
  @Input('idProd') idProduct! :string;

  local_test:any;
  ngOnInit() : void{

    this.route.params.subscribe( (params) => this.local_id = params["idLocal"]);


    this.localSer.getLocales().subscribe(
      (resp) => {
        console.log(resp);
        this.local = resp;
        this.local_test = this.local[parseInt(this.local_id)-1];
        console.log(this.local_test)
      }
    )
    // Se debe pedir todos los productos pertenecientes al local "no se como"
    this.localSer.getProducts(this.local_id).subscribe(
      ( resp ) => {
        this.product = resp;
        console.log(this.product);
      }
    )

    
  }


}


  

  


