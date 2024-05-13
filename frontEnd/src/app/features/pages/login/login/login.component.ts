import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginService } from "../../../../core/services/login-service/login.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";


@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  /*Usuario genérico*/
  public user: string = "";
  public password: string = "";

  private subs: Subscription = new Subscription();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  public login(): void {
    this.loginService.login(this.user, this.password).subscribe((response) => {
      if (response) {
        this.router.navigateByUrl("inicio");
      } else {
        alert("USUARIO INCORRECTO");
      }
    });

  }
}