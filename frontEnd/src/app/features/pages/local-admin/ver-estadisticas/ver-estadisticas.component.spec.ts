import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstadisticasComponent } from './ver-estadisticas.component';

describe('VerEstadisticasComponent', () => {
  let component: VerEstadisticasComponent;
  let fixture: ComponentFixture<VerEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEstadisticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
