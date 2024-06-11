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
  isLoggedIn: WritableSignal<boolean> = signal(false);
  title = "ubereats-fron-end";
  constructor(
    private readonly authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    console.log(this.isLoggedIn());
  }

  public loginOut() {
    this.authService.logout();
    this.isLoggedIn.set(false);
    this.route.navigate(["/", "login"]);
  }
}
