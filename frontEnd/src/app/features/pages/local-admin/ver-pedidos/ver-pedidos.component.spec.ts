import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidosComponent } from './ver-pedidos.component';

describe('VerPedidosComponent', () => {
  let component: VerPedidosComponent;
  let fixture: ComponentFixture<VerPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
