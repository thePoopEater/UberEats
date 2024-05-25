import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { InicioComponent } from "./features/pages/inicio/inicio/inicio.component";
import { CommonModule } from "@angular/common";
import { AuthService } from "./core/services/auth-service/auth.service";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  isLoggedIn: boolean = false;
  title = "ubereats-fron-end";
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isAuth().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  public loginOut() {
    this.authService.logout();
    this.router.navigateByUrl("home");
  }
}
