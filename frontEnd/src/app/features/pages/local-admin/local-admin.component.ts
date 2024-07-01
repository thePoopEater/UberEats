import { Component, inject, Input} from "@angular/core";
import { Local } from "../../../core/models/class/local";
import { LocalService } from "../../../core/services/local-service/local.service";
import { JwtDecoderService } from "../../../core/services/jwt-decoder/jwt-decoder.service";
import { OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { GoogleMap } from "@angular/google-maps";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-local-admin",
  standalone: true,
  imports: [RouterModule, GoogleMap],
  templateUrl: "./local-admin.component.html",
  styleUrl: "./local-admin.component.css",
})
export default class LocalAdminComponent {

  constructor(
    private readonly router : Router,
    private http : HttpClient,
  ){}

  private readonly _locals$ = inject(LocalService);
  private readonly _tokenDecode = inject(JwtDecoderService);
 

  @Input("idLocal") idLocal!: string;
  private idLocalAdmin!: number;
  public local! : Local;
  

  ngOnInit() {
    console.log(this._tokenDecode.decodetoken(sessionStorage.getItem('Token')!));
    this.idLocalAdmin = this._tokenDecode.decodetoken(sessionStorage.getItem('Token')!).sub;

    this._locals$.getLocalFromAdmin(this.idLocalAdmin).subscribe( (data) => {
      this.local = data
      console.log(data);
    });

    


  }

  public goToEdit(idLocal : number){
    this.router.navigateByUrl("adminLocal/editar/"+idLocal);
  }
}
