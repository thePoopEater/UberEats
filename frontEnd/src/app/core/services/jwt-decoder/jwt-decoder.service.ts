import { JsonPipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { JwtData } from "../../models/data-jwt";

@Injectable({
  providedIn: "root",
})
export class JwtDecoderService {
  constructor() {}

  dataPayload!: JwtData;
  tokenJWT!: string;

  public decodetoken(token: string) {
    this.tokenJWT = token;
    const base64Url = token.split(".")[1]; // tomar el payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    this.dataPayload = JSON.parse(jsonPayload);
    return this.dataPayload;
  }
}
