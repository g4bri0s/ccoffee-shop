
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterItem } from 'src/app/interfaces/registerItem';
import { ICoffee } from 'src/app/interfaces/coffee';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.css'],
})
export class RegisterItemComponent {

  constructor(private itemService: ItemService, private router: Router) {}

  registerItemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    coffeeId: new FormControl(0, Validators.required),
    coffeeName: new FormControl('', Validators.required),
    coffeePrice: new FormControl(0, Validators.required),
  });

  register() {
    const item: IRegisterItem = {
      name: this.registerItemForm.value.name || '',
      price: this.registerItemForm.value.price || 0,
      coffee: {
        id: this.registerItemForm.value.coffeeId || 0,
        name: this.registerItemForm.value.coffeeName || '',
        price: this.registerItemForm.value.coffeePrice || 0,
      } as ICoffee,
    };

    const saveItem: IRegisterItem = {
      name: item.name,
      price: item.price,
      coffee: {
        id: item.coffee.id,
        name: item.coffee.name,
        price: item.coffee.price,
      } as ICoffee
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

  refreshPagAfterButton(redirectedPage: string) {
    setTimeout(() => {
      this.router.navigate([`${redirectedPage}`]);
    }, 2000);
  }
}
 