import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../../../../core/layouts/footer-home/footer-home.component';
import { SuperLocalComponent } from '../components/super-local/super-local.component';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '../../../../core/services/local-service/local.service';
import { Local } from '../../../../core/models/class/local';
import { LoginService } from '../../../../core/services/login-service/login.service';
@Component({
  selector: "app-inicio",
  standalone: true,
  imports: [
    CommonModule,
    FooterHomeComponent,
    SuperLocalComponent,
    RouterLink,
    NgFor,
    HeaderComponent,
  ],
  templateUrl: "./inicio.component.html",
  styleUrl: "./inicio.component.css",
})
export class InicioComponent implements OnInit {
  constructor(private http: HttpClient, private localService: LocalService) {}

  private locals: Local[] = [];

  @Input("idLocal") idLocal!: string;
  private localSer$ = inject(LocalService);

  ngOnInit() {
    this.localSer$.getLocales().subscribe((locals) => {
      this.locals = locals;
    });
  }

  getLocals(): Local[] {
    return this.locals;
  }


  logout(){
    this._loginService$.logout()
  }
  
}
