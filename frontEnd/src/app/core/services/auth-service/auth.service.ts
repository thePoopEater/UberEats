import { Location } from "@angular/common";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, firstValueFrom, Observable, of } from "rxjs";
import { User, UserCreateDTO, UserResponse } from "../../models/class/User";
import { env } from "../../enviroment/enviroment";
import { LocalAdmin, LocalAdminCreate } from "../../models/class/local-admin";
import { Response } from "../../models/class/response";
import { jwtDecode } from "jwt-decode";
import { JwtDecoderService } from "../jwt-decoder/jwt-decoder.service";
import { JwtData } from "../../models/data-jwt";
import { Delivery } from "../../models/class/delivery";
import { Address, CreateAddressDTO } from "../../models/class/address";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private dataJWT$ = inject(JwtDecoderService);
  private loggedIn = new BehaviorSubject<boolean>(this.isAuth());

  constructor(private readonly httpClient: HttpClient) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public async login(email: string, password: string): Promise<UserResponse> {
    const user = new User(email, password);
    const userResponse: UserResponse = await firstValueFrom(
      this.httpClient.post<UserResponse>(env.USER_LOGIN_POST_URL, user)
    );
    sessionStorage.setItem("token", userResponse.accessToken);
    this.loggedIn.next(true);
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
  public getUser(userId: number): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.httpClient.get<User>(env.URL_PUT_USER + userId, {
      headers: headers,
    });
  }

  public registerLocalAdmin(userId: number): Observable<Response<LocalAdmin>> {
    const local_admin = new LocalAdminCreate(userId);

    return this.httpClient.post<Response<LocalAdmin>>(env.API_URL, local_admin);
  }
  public registerDelivery(delivery: Delivery) {
    this.httpClient.post<Response<Delivery>>(env.URL_POST_DELIVERY, delivery);
  }

  public logout() {
    sessionStorage.clear();
    this.loggedIn.next(false);
  }

  public isAuth(): boolean {
    if (sessionStorage.getItem("token")) return true;
    return false;
  }

  public getRole(): string {
    if (sessionStorage.getItem("token")) {
      const jwtData = this.dataJWT$.decodetoken(
        sessionStorage.getItem("token") + ""
      );
      return jwtData.role;
    }
    return "";
  }
  public getTokenDecoded(): JwtData {
    return this.dataJWT$.decodetoken(sessionStorage.getItem("token") + "");
  }
  public getToken(): string {
    return sessionStorage.getItem("token") + "";
  }

  public addAddress(address: CreateAddressDTO): Observable<Response<Address>> {
    const token = this.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.httpClient.post<Response<Address>>(
      env.URL_POST_ADDRESS,
      address,
      {
        headers: headers,
      }
    );
  }
  public getAddresses(userId: number): Observable<Address[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.httpClient.get<Address[]>(
      env.URL_GET_ALL_ADDRESS_USER + userId,
      { headers: headers }
    );
  }
}
