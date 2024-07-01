import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  // Variables
  isLoggedIn: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log(loggedIn);
    });
  }

  public loginOut() {
    this.authService.logout();
    this.router.navigate(["/", "home"]);
  }

  public renavigate() {
    if (this.authService.isAuth()) {
      this.router.navigate(["/", "inicio"]);
    } else {
      this.router.navigate(["/", "home"]);
    }
  }
}
