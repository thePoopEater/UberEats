import { Component, inject, Input} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Local, LocalUpdate } from '../../../../core/models/class/local';
import { LocalService } from '../../../../core/services/local-service/local.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-editar-datos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './editar-datos.component.html',
  styleUrl: './editar-datos.component.css'
})
export default class EditarDatosComponent {

  
  constructor(
    private readonly route : ActivatedRoute
  ){


  }

  private localService$ = inject(LocalService);
  private local_id! : string;
  public local!: Local;
  editDataForm! : FormGroup;
  @Input("idLocal") idLocal!: string;


  ngOnInit(){
    this.route.params.subscribe(
      (params) => {
        console.log(params)
        this.local_id = params["idLocal"]
        console.log(params["idLocal"]);
      }
    )

    this.localService$.getLocal(this.local_id).subscribe(
      (local) => {
        this.local = local;
        console.log(this.local);

        this.editDataForm = new FormGroup(
          {
            nameLocal : new FormControl<string>(local.name),
            address : new FormControl<string>(local.address),
            image : new FormControl<string>(local.image),
            schedule : new FormControl<string>(local.schedule),
            description : new FormControl<string>(local.description),
            category : new FormControl<string>(local.category),
          }
        )

      }
    )



  }



  public editData(){
    const localUpdate : LocalUpdate = {
      "name" : this.editDataForm.controls["nameLocal"].value,
      "address" : this.editDataForm.controls["address"].value,
      "image" : this.editDataForm.controls["image"].value,
      "schedule" : this.editDataForm.controls["schedule"].value,
      "category" : this.editDataForm.controls["category"].value,
    }

    console.log("ID Local", this.idLocal);
    const token: string = sessionStorage.getItem('Token')!;
    this.localService$.editLocal(parseInt(this.idLocal), localUpdate, token).subscribe(
      (data) => {
        console.log("Paso algo ete setch", data);
      }
    );
  }


}
