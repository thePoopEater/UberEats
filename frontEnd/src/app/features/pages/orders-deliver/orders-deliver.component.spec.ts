import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDeliverComponent } from './orders-deliver.component';

describe('OrdersDeliverComponent', () => {
  let component: OrdersDeliverComponent;
  let fixture: ComponentFixture<OrdersDeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDeliverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
