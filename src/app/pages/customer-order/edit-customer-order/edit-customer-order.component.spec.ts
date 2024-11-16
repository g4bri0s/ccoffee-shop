import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerOrderComponent } from './edit-customer-order.component';

describe('EditCustomerOrderComponent', () => {
  let component: EditCustomerOrderComponent;
  let fixture: ComponentFixture<EditCustomerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCustomerOrderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditCustomerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
