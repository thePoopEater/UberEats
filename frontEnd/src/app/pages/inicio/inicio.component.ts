import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../footer-home/footer-home.component';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FooterHomeComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
