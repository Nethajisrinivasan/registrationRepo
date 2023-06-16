import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwdverificationComponent } from './resetpwdverification.component';

describe('ResetpwdverificationComponent', () => {
  let component: ResetpwdverificationComponent;
  let fixture: ComponentFixture<ResetpwdverificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetpwdverificationComponent]
    });
    fixture = TestBed.createComponent(ResetpwdverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
