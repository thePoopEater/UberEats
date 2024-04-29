import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../components/footer-home/footer-home.component';
import { SuperLocalComponent } from '../components/super-local/super-local.component';
import { ProductoComponent } from '../components/producto/producto.component';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FooterHomeComponent, SuperLocalComponent, ProductoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  
}
