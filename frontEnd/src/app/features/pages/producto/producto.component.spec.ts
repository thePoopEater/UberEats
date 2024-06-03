import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponent } from './producto.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoComponent, RouterModule.forRoot([]), HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});