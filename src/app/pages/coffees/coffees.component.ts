import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../../services/coffee.service';

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
})
export class CoffeesComponent implements OnInit {
  coffees: any[] = [];
  newCoffee = { id: 0, name: '', price: 0 };
  isEdit = false;

  constructor(private coffeeService: CoffeeService) { }

  ngOnInit(): void {
    this.loadCoffees();
  }

  loadCoffees(): void {
    this.coffeeService.getAll().subscribe((data) => (this.coffees = data));
  }

  addOrUpdateCoffee(): void {
    if (this.isEdit) {
      this.coffeeService.update(this.newCoffee.id, this.newCoffee).subscribe(() => {
        this.resetForm();
        this.loadCoffees();
      });
    } else {
      this.coffeeService.create(this.newCoffee).subscribe(() => {
        this.resetForm();
        this.loadCoffees();
      });
    }
  }

  editCoffee(coffee: any): void {
    this.newCoffee = { ...coffee };
    this.isEdit = true;
  }

  deleteCoffee(id: number): void {
    this.coffeeService.delete(id).subscribe(() => {
      this.loadCoffees();
    });
  }

  resetForm(): void {
    this.newCoffee = { id: 0, name: '', price: 0 };
    this.isEdit = false;
  }
}
