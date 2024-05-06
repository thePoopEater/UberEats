import { Component, Input, OnInit, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalEat } from '../../services/local-service/local-eat';
import { LocalService } from '../../services/local-service/local.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../container/inicio/clases';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-local',
  standalone: true, 
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LocalComponent implements OnInit {



  private localServ = inject(LocalService);
  url_local = "http://localhost:3000/local/"
  url_product = "http://localhost:3000/local/products/"

  // Este hijo recibe el id del local
  local_name : string = '';
  local : any;
  product : any[] = [];
  constructor(private route: ActivatedRoute, private http : HttpClient){
    
  }

  ngOnInit() : void{
    this.route.params.subscribe( (params) => this.local_name = params["nombre_local"]);

    
      this.http.get<any>(this.url_local+this.local_name).subscribe(data=>{
        this.local = data;
      })
      
      this.http.get<any>(this.url_product+this.local_name).subscribe(
        data =>{
          this.product = data;
        }
      )
      console.log(this.local_name);
      console.log(this.local);
      
    
  }

}


  

  


