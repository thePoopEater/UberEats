import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../components/footer-home/footer-home.component';
import { SuperLocalComponent } from '../components/super-local/super-local.component';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Input } from '@angular/core';
import { LocalService } from '../../../services/local-service/local.service';
import { LocalEat } from '../../../services/local-service/local-eat';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FooterHomeComponent, SuperLocalComponent, RouterLink, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  @Input('local_nombre') nombre_producto! : string;
  ngOnInit() {
  }

  
  private localSer = inject(LocalService);
  local_list = this.localSer.getLocals()();


}
