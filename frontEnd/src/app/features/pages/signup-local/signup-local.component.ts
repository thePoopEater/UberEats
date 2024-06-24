import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth-service/auth.service";

@Component({
  selector: "app-signup-local",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./signup-local.component.html",
  styleUrl: "./signup-local.component.css",
})
export class SignupLocalComponent {
  signup_local_form: FormGroup = new FormGroup({});

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.signup_local_form = new FormGroup({
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
    });
  }

  public register() {
    const name: string = this.signup_local_form.controls["name"].value;
    const last_name: string =
      this.signup_local_form.controls["last_name"].value;
    const email: string = this.signup_local_form.controls["email"].value;
    const password: string = this.signup_local_form.controls["password"].value;
    const address: string = this.signup_local_form.controls["address"].value;
    this.router.navigate(["local/admin"]);
  }
}
