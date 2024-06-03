import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../../core/services/auth-service/auth.service";
import { CommonModule } from "@angular/common";
import { firstValueFrom } from "rxjs";
import { User, UserResponse } from "../../../../core/models/class/user";
import { Router } from "@angular/router";


@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  user_register_form: FormGroup = new FormGroup({});

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.user_register_form = new FormGroup({
      email: new FormControl<string>("", [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl<string>("", Validators.required),
      last_name: new FormControl<string>("", Validators.required),
      password: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormControl<string>("", Validators.required),
      role: new FormControl<string>("client"),
    });
  }
  public async register() {
    const name = this.user_register_form.controls["name"].value;
    const last_name = this.user_register_form.controls["last_name"].value;

    const password = this.user_register_form.controls["password"].value;
    const email = this.user_register_form.controls["email"].value;
    const role = this.user_register_form.controls["role"].value;
    try {
      const register_response = await firstValueFrom(
        this.authService.register(name, last_name, email, password, "client")
      );

      console.log("Register response");
      console.log(register_response);
    } catch (register_error) {
      console.log("Register error", register_error);
    }
    try {
      const login_response: UserResponse = await firstValueFrom(
        this.authService.login(email, password)
      );
      console.log(login_response);
      sessionStorage.setItem("client_id", login_response.clientId + "");
      sessionStorage.setItem("token", login_response.accessToken);
      sessionStorage.setItem("role", login_response.role);
      this.router.navigateByUrl("inicio");
    } catch (login_error) {
      console.log("Login error", login_error);
    }

  }
}
