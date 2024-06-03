import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from '../../models/class/local';
import { Observable } from 'rxjs';
import { env } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http : HttpClient){  }


  
  public getLocales() : Observable<Local[]> {
    return this.http.get<Local[]>(env.URL_ALL_LOCAL);
  }

  public getLocal(id : string) : Observable<Local> {
    return this.http.get<Local>(env.URL_LOCAL + id);
  }
}
