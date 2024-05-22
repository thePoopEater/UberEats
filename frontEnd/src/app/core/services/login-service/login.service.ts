import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User, UserResponse } from '../../models/class/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private USER_LOGIN_POST_URL = 'http://localhost:3000/auth/login';

  constructor(
    private httpClient : HttpClient,
    private location : Location
  ) { }

  public login(userName: string, userPass: string): Observable<UserResponse> {
    const user = new User(userName, userPass);
    return this.httpClient.post<UserResponse>(this.USER_LOGIN_POST_URL,user);
  }

  public logout(): Observable<boolean> {
    if (sessionStorage.getItem('token')) sessionStorage.clear();
      return of(true);
    }

  public  isAuth() : Observable<boolean> {
    if (sessionStorage.getItem('token')) return of(true);

    return of(false);
  }

  public isLoggedIn() : Observable<boolean> {
    if (sessionStorage.getItem('token')) {
      return of(false);

      this.location.back();
    }
    return of(true);
  }

}

