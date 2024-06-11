import { Component, OnInit } from "@angular/core";
import { FormGroup, FormsModule, Validators } from "@angular/forms";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth-service/auth.service";
import { UserResponse } from "../../../../core/models/class/user";
import { Router, RouterLink } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { JwtDecoderService } from "../../../../core/services/jwt-decoder/jwt-decoder.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly jwtService: JwtDecoderService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl<string>("", [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>("", Validators.required),
    });
  }
  //en esta funcion falta describir el caso cuando el usuario no esta en la BD.
  public async login() {
    const email = this.loginForm.controls["email"].value;
    const password = this.loginForm.controls["password"].value;
    try {
      const userResponse: UserResponse = await this.authService.login(
        email,
        password
      );
      const decodeJWT = this.jwtService.decodetoken(userResponse.accessToken);
      console.log("Este es el token decodificado", decodeJWT.clientId);

      if (decodeJWT.clientId !== undefined) {
        this.router.navigate(["/inicio"]);
      }

      if (decodeJWT.localAdminId !== undefined) {
        this.router.navigate(["local/admin"]);
      }
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  }
}
