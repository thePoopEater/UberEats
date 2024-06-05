import { Component, OnInit, WritableSignal, inject, signal } from "@angular/core";
import { FormGroup, FormsModule, Validators } from "@angular/forms";
import { FormControl, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth-service/auth.service";
import { User, UserResponse } from "../../../../core/models/class/user";
import { Subscription } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jwt-decode";
import { JwtDecoderService } from "../../../../core/services/jwt-decoder/jwt-decoder.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private readonly _loginForm = inject(FormBuilder);
  private _jwtDecode$ = inject(JwtDecoderService);


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
      const userResponse : UserResponse= await firstValueFrom(
        this.authService.login(email, password)
      );
      console.log(userResponse);

      const decodeJWT = this._jwtDecode$.decodetoken(userResponse.accessToken);
      console.log("Este es el token decodificado", decodeJWT.clientId);

      if(decodeJWT.clientId !== undefined){
        this.router.navigate(["/inicio"]);
      }

      if(decodeJWT.localAdminId !== undefined){
        this.router.navigate(["local/admin"]);
      }

    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  }
}
