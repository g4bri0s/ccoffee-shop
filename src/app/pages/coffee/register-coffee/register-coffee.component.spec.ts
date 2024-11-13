import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCoffeeComponent } from './register-coffee.component';

describe('RegisterCoffeeComponent', () => {
  let component: RegisterCoffeeComponent;
  let fixture: ComponentFixture<RegisterCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCoffeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
