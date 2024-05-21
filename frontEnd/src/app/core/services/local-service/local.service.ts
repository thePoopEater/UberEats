import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from '../../models/class/local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private URL_ALL_LOCAL = "http://localhost:3000/local";
  private URL_LOCAL = "http://localhost:3000/local/";
  constructor(private http : HttpClient){  }


  
  public getLocales() : Observable<Local[]> {
    return this.http.get<Local[]>(this.URL_ALL_LOCAL);
  }

  public getLocal(id : string) : Observable<Local> {
    return this.http.get<Local>(this.URL_LOCAL + id);
  }
}
