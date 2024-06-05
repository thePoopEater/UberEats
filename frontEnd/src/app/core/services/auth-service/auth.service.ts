import { Location } from "@angular/common";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User, UserCreateDTO, UserResponse } from "../../models/class/user";
import { env } from "../../enviroment/enviroment";
import { LocalAdmin, LocalAdminCreate } from "../../models/class/local-admin";
import { Response } from "../../models/class/response";
import { jwtDecode } from "jwt-decode";
import { JwtDecoderService } from "../jwt-decoder/jwt-decoder.service";
import { JwtData } from "../../models/data-jwt";

@Injectable({
  providedIn: "root",
})


export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private dataJWT$ = inject(JwtDecoderService);
  constructor(private httpClient: HttpClient, private location: Location) {}

  public login(email: string, password: string): Observable<UserResponse> {
    const user = new User(email, password);
    console.log(user);
    return this.httpClient.post<UserResponse>(env.USER_LOGIN_POST_URL, user);
  }
  public register(
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
  ): Observable<UserResponse> {
    const new_user = new UserCreateDTO(name, last_name, email, password, role);
    return this.httpClient.post<UserResponse>(
      env.USER_REGISTER_POST_URL,
      new_user
    );
  }

  public registerLocalAdmin(userId: number): Observable<Response<LocalAdmin>> {
    const local_admin = new LocalAdminCreate(userId);

    return this.httpClient.post<Response<LocalAdmin>>(env.API_URL, local_admin);
  }

  public logout(): Observable<boolean> {
    if (this.dataJWT$.dataPayload) this.dataJWT$.dataPayload = new JwtData();
    return of(true);
  }

  public isAuth(): Observable<boolean> {
    if (this.dataJWT$.dataPayload) return of(true);
    return of(false);
  }
  public isLoggedIn(): Observable<boolean> {
    if (this.dataJWT$.dataPayload) {
      return of(false);
    }
    return of(true);
  }
  public getRole() {
    if (this.dataJWT$.dataPayload.role) {
      return this.dataJWT$.dataPayload.role;
    }
    return "";
  }
}
