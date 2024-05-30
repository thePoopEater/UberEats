import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup-deliver",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./signup-deliver.component.html",
  styleUrl: "./signup-deliver.component.css",
})
export class SignupDeliverComponent {
  signup_delivery_form: FormGroup = new FormGroup({
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    name: new FormControl<string>("", Validators.required),
    last_name: new FormControl<string>("", Validators.required),
    password: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    plate_number: new FormControl<string>(""),
    type_vehicle: new FormControl<string>(""),
    address: new FormControl<string>("", Validators.required),
  });

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public register() {
    const name = this.signup_delivery_form.controls["name"].value;
    const password = this.signup_delivery_form.controls["password"].value;
    const plate_number =
      this.signup_delivery_form.controls["plate_number"].value;
    const type_vehicle =
      this.signup_delivery_form.controls["type_vehicle"].value;

    // this.authService.register(username,password,plate_number,run,kind_vehicle);
    this.router.navigate(["deliver"]);
  }
}
