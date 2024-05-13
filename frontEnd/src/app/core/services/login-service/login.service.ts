import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private regularUser: string = 'user';
  private regularPassword: string = 'user';

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  public login(username: string, password: string): Observable<boolean> {
    const isRegularUser = username === this.regularUser && password === this.regularPassword;

    if (isRegularUser) {
      const token: string = btoa(username + ';' + password);
      sessionStorage.setItem('token', token);
      return of(true);
    }

    return of(false);
  }

  public logout(): boolean {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      return true;
    }

    return false;
  }

  public isLoggedIn(): Observable<boolean> {
    let token = sessionStorage.getItem('token');

    if (token) {
      let user: string = atob(token);
      return of(true);
    }

    this.location.back();
    return of(false);
  }

  public isAlreadyLogged(): Observable<boolean>{
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('inicio');
      return of(false);
    } 

    return of(true);
  }

}

