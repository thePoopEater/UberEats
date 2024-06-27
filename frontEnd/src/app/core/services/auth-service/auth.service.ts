import { Location } from "@angular/common";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, firstValueFrom, Observable, of } from "rxjs";
import { User, UserCreateDTO, UserResponse } from "../../models/class/User";
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
  private dataJWT$ = inject(JwtDecoderService);
  constructor(private httpClient: HttpClient, private location: Location) {}

  public async login(email: string, password: string): Promise<UserResponse> {
    const user = new User(email, password);
    const userResponse: UserResponse = await firstValueFrom(
      this.httpClient.post<UserResponse>(env.USER_LOGIN_POST_URL, user)
    );
    if (userResponse) {
      const decodeJWT = this.dataJWT$.decodetoken(userResponse.accessToken);
      sessionStorage.setItem("role", decodeJWT.role);
      sessionStorage.setItem("Token", userResponse.accessToken);
    }
    return userResponse;
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

  public logout() {
    sessionStorage.clear();
  }

  public isAuth(): Observable<boolean> {
    if (sessionStorage.getItem("role")) return of(true);
    return of(false);
  }

  public getRole() {
    if (sessionStorage.getItem("role")) {
      return sessionStorage.getItem("role");
    }
    return "";
  }
}
