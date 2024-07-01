import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Local, LocalUpdate } from "../../models/class/local";
import { Observable } from "rxjs";
import { env } from "../../enviroment/enviroment";
import { Order } from "../../models/class/orders";
import {
  ProductOrder,
  ProductOrderResponse,
} from "../../models/class/product-order";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  constructor(private http: HttpClient) {}

  public getLocals(): Observable<Local[]> {
    return this.http.get<Local[]>(env.URL_ALL_LOCAL);
  }

  public getLocal(id: string): Observable<Local> {
    return this.http.get<Local>(env.URL_LOCAL + id);
  }

  public getLocalFromAdmin(idAdminLocal: number): Observable<Local> {
    const token = sessionStorage.getItem("token");
    const header = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("numbero id admin: ", idAdminLocal);

    return this.http.get<Local>(env.URL_GET_LOCAL_FROM_ADMIN + idAdminLocal, {
      headers: header,
    });
  }

  public editLocal(idLocal: number, localData: LocalUpdate, token: string) {
    const header = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const body = {
      name: localData.name,
      address: localData.address,
      image: localData.image,
      schedule: localData.schedule,
      category: localData.category,
    };
    console.log("hola sigo aqui");
    return this.http.put<any>(env.URL_EDIT_LOCAL + idLocal, body, {
      headers: header,
    });
  }

  public getOrdersFromLocal(
    idLocal: number,
    token: string
  ): Observable<Order[]> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<Order[]>(env.URL_GET_ORDERS_FROM_LOCAL + idLocal, {
      headers: header,
    });
  }

  public getOrder(idOrder: number, token: string): Observable<Order> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<Order>(env.URL_GET_ORDER + idOrder, {
      headers: header,
    });
  }

  public getProductsFromOrder(
    idOrder: number,
    token: string
  ): Observable<ProductOrderResponse[]> {
    const header = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<ProductOrderResponse[]>(
      env.URL_GET_PRODUCTS_FROM_ORDER + idOrder,
      {
        headers: header,
      }
    );
  }

  public delOrder(idOrder: number, token: string) {
    const header = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put(
      env.ULR_PUT_ORDER,
      { state: "Cancelado" },
      {
        headers: header,
      }
    );
  }
}
