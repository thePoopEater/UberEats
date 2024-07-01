import { Component, inject, Input } from "@angular/core";
import { Local } from "../../../core/models/class/local";
import { LocalService } from "../../../core/services/local-service/local.service";
import { JwtDecoderService } from "../../../core/services/jwt-decoder/jwt-decoder.service";
import { OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../core/services/auth-service/auth.service";

@Component({
  selector: "app-local-admin",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./local-admin.component.html",
  styleUrl: "./local-admin.component.css",
})
export default class LocalAdminComponent {
  constructor(
    private readonly router: Router,
    private authService: AuthService
  ) {}

  private readonly _locals$ = inject(LocalService);
  private readonly _tokenDecode = inject(JwtDecoderService);

  @Input("idLocal") idLocal!: string;
  private idLocalAdmin!: number;
  public local!: Local;

  ngOnInit() {
    console.log(this.authService.getTokenDecoded());
    this.idLocalAdmin = this.authService.getTokenDecoded().sub;

    this._locals$.getLocalFromAdmin(this.idLocalAdmin).subscribe((data) => {
      this.local = data;
      console.log(data);
    });
  }

  public goToEdit(idLocal: number) {
    this.router.navigateByUrl("adminLocal/editar/" + idLocal);
  }
}
