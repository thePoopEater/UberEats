import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmacion-pedido',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirmacion-pedido.component.html',
  styleUrls: ['./confirmacion-pedido.component.css']
})
export class ConfirmacionPedidoComponent implements OnInit {
  countdown: number = 7;
  progressWidth: number = 0;
  countdownString: string = '00:07';
  interval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.countdown--;
      this.progressWidth = ((9 - this.countdown) / 7) * 100;
      this.countdownString = this.formatTime(this.countdown);

      if (this.countdown < 0) {
        clearInterval(this.interval);
        this.router.navigate(['/seguimiento-pedido']);
      }
    }, 1000);
  }

  cancelarPedido() {
    clearInterval(this.interval);
    this.router.navigate(['/pagos']);
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }
}
