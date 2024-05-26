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

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  user_register_form: FormGroup = new FormGroup({});

  constructor(private readonly authService: AuthService) {}
  ngOnInit() {
    this.user_register_form = new FormGroup({
      username: new FormControl<string>("", Validators.required),
      password: new FormControl<string>("", Validators.required),
      role: new FormControl<string>("Cliente"),
      address: new FormControl<string>(""),
    });
  }
  public register() {
    const username = this.user_register_form.controls["username"].value;
    const password = this.user_register_form.controls["password"].value;
    const role = this.user_register_form.controls["role"].value;
    this.authService
      .register(username, password, role)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
