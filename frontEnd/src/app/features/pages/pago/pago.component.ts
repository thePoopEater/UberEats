import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  imports: [RouterLink]
})
export class PagoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
