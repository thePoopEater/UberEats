import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLocalComponent } from './signup-local.component';

describe('SignupLocalComponent', () => {
  let component: SignupLocalComponent;
  let fixture: ComponentFixture<SignupLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
