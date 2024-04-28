import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FooterHomeComponent } from './pages/footer-home/footer-home.component';
import { LocalComponent } from './pages/local/local.component';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterHomeComponent, InicioComponent, LocalComponent, CommonModule 
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ubereats-fron-end';

}


