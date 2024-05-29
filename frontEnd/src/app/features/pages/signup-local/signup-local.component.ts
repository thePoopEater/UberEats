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
      username: new FormControl<string>(""),
      password: new FormControl<string>(""),
      category: new FormControl<string>(""),
      address: new FormControl<string>(""),
      country: new FormControl<string>(""),
    });
  }

  public register() {
    const username: string = this.signup_local_form.controls["username"].value;
    const password: string = this.signup_local_form.controls["password"].value;
    const category: string = this.signup_local_form.controls["category"].value;
    const address: string = this.signup_local_form.controls["address"].value;
    const country: string = this.signup_local_form.controls["country"].value;

    this.router.navigate(["local/admin"]);
  }
}
