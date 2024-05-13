import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperLocalComponent } from './super-local.component';

describe('SuperLocalComponent', () => {
  let component: SuperLocalComponent;
  let fixture: ComponentFixture<SuperLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
