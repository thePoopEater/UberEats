import { Component, OnInit, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Product } from "../../../core/models/class/product";

@Component({
  selector: "app-pago",
  standalone: true,
  templateUrl: "./pago.component.html",
  styleUrls: ["./pago.component.css"],
  imports: [RouterLink, CommonModule],
})
export class PagoComponent implements OnInit {
  constructor() {}

  listProds: Product[] = [];
  ngOnInit() {
    this.listProds = [];
  }

  generateOrder() {}
}
