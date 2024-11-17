import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterItem } from 'src/app/interfaces/registerItem';
import { ICoffee } from 'src/app/interfaces/coffee';
import { ItemService } from 'src/app/services/item.service';
import { CoffeeService } from 'src/app/services/coffee.service';  // Serviço para carregar cafés
import Swal from 'sweetalert2';
import { ICustomerOrder } from 'src/app/interfaces/customerOrder';

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.css'],
})
export class RegisterItemComponent implements OnInit {

  coffees: ICoffee[] = [];
  selectedCoffee: ICoffee | null = null;

  constructor(
    private itemService: ItemService,
    private coffeeService: CoffeeService,
    private router: Router
  ) { }

  registerItemForm = new FormGroup({
    coffeeId: new FormControl(0, Validators.required),
    price: new FormControl(0),
    quantity: new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    this.loadCoffees();
  }

  loadCoffees(): void {
    this.coffeeService.getCoffees().subscribe((coffees: ICoffee[]) => {
      this.coffees = coffees;
    });
  }

  onCoffeeChange(): void {
    const coffeeId = this.registerItemForm.value.coffeeId;
    this.selectedCoffee = this.coffees.find(coffee => coffee.id === coffeeId) || null;

    if (this.selectedCoffee) {
      this.registerItemForm.patchValue({
        price: this.selectedCoffee.price
      });
    }
  }  

  register(): void {
    const item: IRegisterItem = {
      coffee: {
        id: this.registerItemForm.value.coffeeId || 0,
        name: this.selectedCoffee?.name || '',
        price: this.selectedCoffee?.price || 0,
      } as ICoffee,
      customerOrder: {} as ICustomerOrder,  
      quantity: this.registerItemForm.value.quantity || 0,
    };

    const saveItem: IRegisterItem = {
      coffee: {
        id: item.coffee.id,
        name: item.coffee.name,
        price: item.coffee.price,
      } as ICoffee,
      customerOrder: {} as ICustomerOrder, 
      quantity: item.quantity,
    };

    this.itemService.registerItem(saveItem).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Item saved',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Unexpected error',
        });
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/items']);
  }
}
