import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterHomeComponent } from "../../../../core/layouts/footer-home/footer-home.component";
import { SuperLocalComponent } from "../components/super-local/super-local.component";
import { HeaderComponent } from "../components/header/header.component";
import { Router, RouterLink } from "@angular/router";
import { Input } from "@angular/core";
import { NgFor } from "@angular/common";
import { LocalService } from "../../../../core/services/local-service/local.service";
import { Local } from "../../../../core/models/class/local";
import { AuthService } from "../../../../core/services/auth-service/auth.service";
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
  constructor(
    private readonly authService: AuthService,
    private readonly localService: LocalService,
    private readonly router: Router
  ) {}

  private locals: Local[] = [];

  @Input("idLocal") idLocal!: string;

  ngOnInit() {
    this.localService.getLocals().subscribe((locals) => {
      this.locals = locals;
    });
  }

  getLocals(): Local[] {
    return this.locals;
  }

  logout() {
    this.authService.logout();
  }

  goToLocal(idLocal: number) {
    this.router.navigateByUrl("local/" + idLocal);
  }
}
