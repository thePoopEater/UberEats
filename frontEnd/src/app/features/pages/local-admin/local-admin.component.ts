import { Component, inject } from "@angular/core";
import { Local } from "../../../core/models/class/local";
import { LocalService } from "../../../core/services/local-service/local.service";
import { JwtDecoderService } from "../../../core/services/jwt-decoder/jwt-decoder.service";
import { OnInit } from "@angular/core";

@Component({
  selector: "app-local-admin",
  standalone: true,
  imports: [],
  templateUrl: "./local-admin.component.html",
  styleUrl: "./local-admin.component.css",
})
export class LocalAdminComponent {
  private readonly _locals$ = inject(LocalService);
  private readonly _tokenDecode = inject(JwtDecoderService);

  private idLocalAdmin!: number;
  public local! : Local;

  ngOnInit() {
    this.idLocalAdmin = this._tokenDecode.decodetoken(sessionStorage.getItem('Token')!).localAdminId;

    this._locals$.getLocalFromAdmin(this.idLocalAdmin).subscribe( (data) => {
      this.local = data
      console.log(data);
    });
  }
}
