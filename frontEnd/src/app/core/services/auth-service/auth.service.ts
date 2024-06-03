import { Location } from "@angular/common";
import { Injectable, WritableSignal, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserCreateDTO, UserResponse } from "../../models/class/user";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private USER_LOGIN_POST_URL = "http://localhost:3000/auth/login";
  private USER_REGISTER_POST_URL = "http://localhost:3000/auth/register";
  loggedIn : WritableSignal<boolean> = signal(false);
  constructor(private httpClient: HttpClient, private location: Location, private route : Router) {}

  public login(
    username: string,
    password: string,
    role: string
  ): Observable<UserResponse> {
    const user = new UserCreateDTO(username, password, role);
    this.loggedIn.set(true);

    return this.httpClient.post<UserResponse>(this.USER_LOGIN_POST_URL, user);
  }
  public register(
    username: string,
    password: string,
    role: string
  ): Observable<UserResponse> {
    const new_user = new UserCreateDTO(username, password, role);
    return this.httpClient.post<UserResponse>(
      this.USER_REGISTER_POST_URL,
      new_user
    );
  }

  public logout(): Observable<boolean> {
    if (sessionStorage.getItem("accessToken")) sessionStorage.clear();
    return of(true);
  }

  public isAuth(): Observable<boolean> {
    if (sessionStorage.getItem("accessToken")) return of(true);
    return of(false);
  }
  public isLoggedIn(): Observable<boolean> {
    if (sessionStorage.getItem("accessToken")) {
      return of(false);
    }
    return of(true);
  }
  public getRole() {
    if (sessionStorage.getItem("client_role")) {
      return sessionStorage.getItem("client_role") + "";
    }
    return "";
  }
}
