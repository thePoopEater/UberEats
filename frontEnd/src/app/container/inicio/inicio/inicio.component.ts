import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../components/footer-home/footer-home.component';
import { SuperLocalComponent } from '../components/super-local/super-local.component';
import { RouterLink} from '@angular/router';
import { Input } from '@angular/core';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FooterHomeComponent, SuperLocalComponent, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  @Input() nombre_producto? : string;
  ngOnInit() {
    if(this.nombre_producto){
    }
  }
}
