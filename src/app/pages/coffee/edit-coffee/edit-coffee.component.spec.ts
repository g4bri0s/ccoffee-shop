import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoffeeComponent } from './edit-coffee.component';

describe('EditCoffeeComponent', () => {
  let component: EditCoffeeComponent;
  let fixture: ComponentFixture<EditCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCoffeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
