import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../components/footer-home/footer-home.component';
import { SuperLocalComponent } from '../components/super-local/super-local.component';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Input } from '@angular/core';
import { LocalService } from '../../../services/local-service/local.service';
import { LocalEat } from '../../../services/local-service/local-eat';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FooterHomeComponent, SuperLocalComponent, RouterLink, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  constructor(private http: HttpClient){}

  @Input('local_nombre') nombre_producto! : string;
  locales  : any;
  url = "http://localhost:3000/local"
  error= null;
  ngOnInit(){
    this.http.get(this.url).subscribe(
      (data => {
        this.locales = data;
      })
    )
    console.log(JSON.stringify(this.locales));
  }
  
  private localSer = inject(LocalService);
  


}
