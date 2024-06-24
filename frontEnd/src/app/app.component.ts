import { Component, WritableSignal, signal } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
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
  title = "ubereats-front-end";
  constructor(
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  ngOnInit() {
    this.authService.isAuth().subscribe((loggedIng) => {
      this.isLoggedIn = loggedIng;
    });
    console.log(this.isLoggedIn);
  }

  public loginOut() {
    this.authService.logout();
    this.route.navigate(["/", "home"]);
  }
}
