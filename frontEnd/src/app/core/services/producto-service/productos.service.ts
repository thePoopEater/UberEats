import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Signal } from "@angular/core";
import { LocalService } from "../local-service/local.service";
import { Observable } from "rxjs";
import { Product } from "../../models/class/product";
import { env } from "../../enviroment/enviroment";

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  constructor(private http: HttpClient) {}


  public getProductsFromLocal(localId: string): Observable<Product[]> {
    return this.http.get<Product[]>(env.URL_ALL_PRODS_FROM_LOCAL + localId);
  }

  public getProduct(prodId: string): Observable<Product> {
    return this.http.get<Product>(env.URL_PROD + prodId);
  }
}
