import { Component, Input, OnInit, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalEat } from '../../services/local-service/local-eat';
import { LocalService } from '../../services/local-service/local.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../container/inicio/clases';
@Component({
  selector: 'app-local',
  standalone: true, 
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LocalComponent implements OnInit {



  private localServ = inject(LocalService);



  // Este hijo recibe el id del local
  local_name:string = '';
  local:LocalEat|undefined = new LocalEat(0, '', [], '')
  product:Product[] = [];
  constructor(private route: ActivatedRoute){
    
  }

  ngOnInit() : void{
    this.route.params.subscribe( (params) => this.local_name = params["nombre_local"]);

    if(this.local === undefined){
      console.log('caca');
    }else{
      this.local = this.localServ.searchLocal(this.local_name);
      if(this.local === undefined){
        console.log('casi')
        
      }else{
        this.product = this.local.getProducts();
        console.log(this.local_name);
        console.log(this.local);
      }

    }
  }



  

}


  

  


