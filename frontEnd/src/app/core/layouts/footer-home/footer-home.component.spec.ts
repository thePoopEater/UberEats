/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterHomeComponent } from './footer-home.component';
import { RouterModule } from '@angular/router';

describe('FooterHomeComponent', () => {
  let component: FooterHomeComponent;
  let fixture: ComponentFixture<FooterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FooterHomeComponent, RouterModule.forRoot([])],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
