import { Component, OnInit, inject } from "@angular/core";
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
  isLogged: boolean = false;
  private readonly _loginForm = inject(FormBuilder);
  loginForm = this._loginForm.nonNullable.group({
    userName: ["", [Validators.required, Validators.email]],
    userPass: ["", Validators.required],
  });
  userLoginOn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  //en esta funcion falta describir el caso cuando el usuario no esta en la BD.
  public async login() {
    const user = this.loginForm.controls.userName.value;
    const password = this.loginForm.controls.userPass.value;
    try {
      const userResponse = await firstValueFrom(
        this.authService.login(user, password, "Cliente")
      );
      sessionStorage.setItem("token", userResponse.accessToken);
      sessionStorage.setItem("client_id", userResponse.userId + "");
      sessionStorage.setItem("client_role", userResponse.role + "");

      this.router.navigate(["/inicio"]);
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  }
}
