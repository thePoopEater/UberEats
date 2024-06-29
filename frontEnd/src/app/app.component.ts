import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./core/services/auth-service/auth.service";
import { NavbarComponent } from "./features/pages/navbar/navbar.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor() {}
  ngOnInit() {}
}
