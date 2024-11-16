
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterItem } from 'src/app/interfaces/registerItem';
import { ICoffee } from 'src/app/interfaces/coffee';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';
import { ICustomerOrder } from 'src/app/interfaces/customerOrder';

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.css'],
})
export class RegisterItemComponent {

  constructor(private itemService: ItemService, private router: Router) { }

  registerItemForm = new FormGroup({
    coffeeId: new FormControl(0, Validators.required),
    coffeeName: new FormControl('', Validators.required),
    coffeePrice: new FormControl(0, Validators.required),
    customerOrderId: new FormControl(0, Validators.required),
    customerOrderCustomerName: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
  });

  register() {
    const item: IRegisterItem = {
      coffee: {
        id: this.registerItemForm.value.coffeeId || 0,
        name: this.registerItemForm.value.coffeeName || '',
        price: this.registerItemForm.value.coffeePrice || 0,
      } as ICoffee,
      customerOrder: {
        id: this.registerItemForm.value.customerOrderId || 0,
        customerName: this.registerItemForm.value.customerOrderCustomerName || '',
        items: null,
        total: null,
      } as ICustomerOrder,
      quantity: this.registerItemForm.value.quantity || 0,
    };

    const saveItem: IRegisterItem = {
      coffee: {
        id: item.coffee.id,
        name: item.coffee.name,
        price: item.coffee.price,
      } as ICoffee,
      customerOrder: {
        id: item.customerOrder.id,
        customerName: item.customerOrder.customerName,
        items: null,
        total: null,
      } as ICustomerOrder,
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
          text: 'Unexpected erro',
        });
      }
    );
  };

  refreshPageAfterButton(redirectedPage: string) {
    setTimeout(() => {
      this.router.navigate([`${redirectedPage}`]);
    }, 2000);
  }

  cancel() {
    this.router.navigate(['/Items']);
  }
}
