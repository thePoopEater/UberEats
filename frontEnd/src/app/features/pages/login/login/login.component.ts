import { Component, OnInit, WritableSignal, inject, signal } from "@angular/core";
import { FormGroup, FormsModule, Validators } from "@angular/forms";
import { FormControl, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth-service/auth.service";
import { User, UserResponse } from "../../../../core/models/class/user";
import { Subscription } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { firstValueFrom } from "rxjs";


@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private readonly _loginForm = inject(FormBuilder);
  loginForm = this._loginForm.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  //en esta funcion falta describir el caso cuando el usuario no esta en la BD.
  public async login() {
    const email = this.loginForm.controls["email"].value;
    const password = this.loginForm.controls["password"].value;
    try {
      console.log(email, password);
      const userResponse = await firstValueFrom(
        this.authService.login(email, password)
      );
      console.log(userResponse);
      sessionStorage.setItem("token", userResponse.accessToken);
      sessionStorage.setItem("client_id", userResponse.clientId + "");
      sessionStorage.setItem("role", userResponse.role);

      this.router.navigate(["/inicio"]);

    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  }
}
