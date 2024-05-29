import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  signup_form: FormGroup = new FormGroup({
    username: new FormControl<string>(""),
    password: new FormControl<string>(""),
    plate_number: new FormControl<string>(""),
    kind_vehicle: new FormControl<string>(""),
    run: new FormControl<string>(""),
  });

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public register() {
    const username = this.signup_form.controls["username"].value;
    const password = this.signup_form.controls["password"].value;
    const plate_number = this.signup_form.controls["plate_number"].value;
    const run = this.signup_form.controls["run"].value;
    const kind_vehicle = this.signup_form.controls["kind_vehicle"].value;

    // this.authService.register(username,password,plate_number,run,kind_vehicle);
    this.router.navigate(["deliver"]);
  }
}
