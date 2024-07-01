import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { User } from "../../../core/models/class/User";
import { CommonModule } from "@angular/common";
import { Address, CreateAddressDTO } from "../../../core/models/class/address";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  user: User = new User("", "");
  direcciones: Address[] = [];
  formAddress: FormGroup = new FormGroup({});
  constructor(private readonly userService: AuthService) {}

  ngOnInit() {
    this.formAddress = new FormGroup({
      name: new FormControl<string>(""),
      description: new FormControl<string>(""),
    });

    this.userService
      .getUser(this.userService.getTokenDecoded().sub)
      .subscribe((userResponse) => {
        this.user = userResponse;
        console.log(this.user);
      });
    this.userService.getAddresses(this.user.userId).subscribe((addresses) => {
      this.direcciones = addresses;
    });
  }

  public hasAdresses(): boolean {
    return this.direcciones.length != 0;
  }

  public addAddress() {
    const newAddress: CreateAddressDTO = new CreateAddressDTO(
      this.formAddress.controls["name"].value,
      this.formAddress.controls["description"].value,
      this.user.userId
    );
    this.userService.addAddress(newAddress).subscribe((response) => {
      console.log(response);
    });
  }
}
