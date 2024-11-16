import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCustomerOrderComponent } from './register-customer-order.component';

describe('RegisterCustomerOrderComponent', () => {
  let component: RegisterCustomerOrderComponent;
  let fixture: ComponentFixture<RegisterCustomerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCustomerOrderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterCustomerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
