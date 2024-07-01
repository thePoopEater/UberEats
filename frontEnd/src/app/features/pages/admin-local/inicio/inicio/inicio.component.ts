import { Component, inject } from '@angular/core';
import { LocalService } from '../../../../../core/services/local-service/local.service';
import { jwtDecode } from 'jwt-decode';
import { Local } from '../../../../../core/models/class/local';
import { JwtDecoderService } from '../../../../../core/services/jwt-decoder/jwt-decoder.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


}



