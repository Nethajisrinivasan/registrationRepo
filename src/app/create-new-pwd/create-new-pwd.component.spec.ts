import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPwdComponent } from './create-new-pwd.component';

describe('CreateNewPwdComponent', () => {
  let component: CreateNewPwdComponent;
  let fixture: ComponentFixture<CreateNewPwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewPwdComponent]
    });
    fixture = TestBed.createComponent(CreateNewPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
