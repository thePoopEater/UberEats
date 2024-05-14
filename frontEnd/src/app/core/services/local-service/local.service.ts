import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from '../../models/class/local';
const URL_ALL_LOCAL = "http://localhost:3000/local";
const URL_PRODUCTS = "http://localhost:3000/local/products/:";
const URL_PRODUCT = "http://localhost:3000/local/products/"
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http : HttpClient){  }


  
  getLocales(){
    return this.http.get<Local[]>(URL_ALL_LOCAL);
  }

  
}
