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
import { ROLES } from "../../../core/enviroment/enviroment";

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

  ngOnInit() {}
  public register() {
    const name = this.signup_delivery_form.controls["name"].value;
    const last_name = this.signup_delivery_form.controls["last_name"].value;
    const password = this.signup_delivery_form.controls["password"].value;
    const email = this.signup_delivery_form.controls["email"].value;

    this.authService
      .register(name, last_name, email, password, ROLES.DELIVERY)
      .subscribe((response) => {
        console.log(response);
      });

    this.router.navigate(["deliver"]);
  }
}
