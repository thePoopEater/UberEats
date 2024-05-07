import { Component, Input, OnInit, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalEat } from '../../services/local-service/local-eat';
import { LocalService } from '../../services/local-service/local.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../container/inicio/clases';
import { HttpClient } from '@angular/common/http';
import { Local } from '../../class/local';
@Component({
  selector: 'app-local',
  standalone: true, 
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LocalComponent implements OnInit {



  private localSer = inject(LocalService);
  url_local = "http://localhost:3000/local/"
  url_product = "http://localhost:3000/local/products/"

  // Este hijo recibe el id del local
  local_id : string = '';
  local : any;
  product : any[] = [];
  constructor(private route: ActivatedRoute, private http : HttpClient, private localService : LocalService){
    
  }

  local_test:any;
  ngOnInit() : void{

    this.route.params.subscribe( (params) => this.local_id = params["nombre_local"]);

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

    )

    
  }


}


  

  


