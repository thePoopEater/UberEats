import { Component, OnInit, inject } from "@angular/core";
import { FormGroup, FormsModule, Validators } from "@angular/forms";
import { FormControl, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { LoginService } from "../../../../core/services/login-service/login.service";
import { User, UserResponse } from "../../../../core/models/class/User";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";


@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  /*Usuario genérico*/
  userResponse : UserResponse = new UserResponse();

  // activa otra ventana
  isLogged : boolean = false;
  private readonly _loginForm = inject(FormBuilder);
  private readonly _signUpForm = inject(FormBuilder);
  loginForm = this._loginForm.nonNullable.group({
    userName : ['', [Validators.required, Validators.email]],
    userPass : ['', Validators.required],
  })

  signUpForm = this._signUpForm.nonNullable.group(
    {
      userName : ['', [Validators.required]],
      userEmail : ['', ]
    }
  )

  private subs: Subscription = new Subscription();

  constructor(private loginService: LoginService, private router: Router) {}

  userLoginOn : boolean = false;
  ngOnInit() {
  }

  public async login() {
    const user = this.loginForm.controls.userName.value;
    const password = this.loginForm.controls.userPass.value;


    console.log(user, password);
    this.loginService.login(user, password).subscribe(
      (response) => {
        this.userResponse = response;
      }
    )
    sessionStorage.setItem('token', this.userResponse.accessToken);
    sessionStorage.setItem('client_id', this.userResponse.userId + '');
    this.router.navigate(['/inicio']);
  }
}