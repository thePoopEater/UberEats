/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmacionPedidoComponent } from './confirmacion-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

describe('ConfirmacionPedidoComponent', () => {
  let component: ConfirmacionPedidoComponent;
  let fixture: ComponentFixture<ConfirmacionPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ConfirmacionPedidoComponent, HttpClientModule, RouterModule.forRoot([])],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
