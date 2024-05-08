import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../components/footer-home/footer-home.component';
import { SuperLocalComponent } from '../components/super-local/super-local.component';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Input } from '@angular/core';
import { LocalEat } from '../../../services/local-service/local-eat';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '../../../services/local-service/local.service';
import { Local } from '../../../class/local';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FooterHomeComponent, SuperLocalComponent, RouterLink, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  constructor(private http: HttpClient, private localService: LocalService){}


  @Input('idLocal') nombre_producto! : string;
  private localSer = inject(LocalService);
  
  locales:any = [];
  ngOnInit(){

    this.localSer.getLocales().subscribe(
      (resp) => {
        console.log(resp);
        this.locales = resp;
        console.log(this.locales[0]);
      }
    )

  }
  

  


}
