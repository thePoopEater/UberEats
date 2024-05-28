import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDeliverComponent } from './signup-deliver.component';

describe('SignupDeliverComponent', () => {
  let component: SignupDeliverComponent;
  let fixture: ComponentFixture<SignupDeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupDeliverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
