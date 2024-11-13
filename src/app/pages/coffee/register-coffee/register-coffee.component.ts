
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterCoffee } from 'src/app/interfaces/registerCoffee';
import { CoffeeService } from 'src/app/services/coffee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-coffee',
  templateUrl: './register-coffee.component.html',
  styleUrls: ['./register-coffee.component.css'],
})
export class RegisterCoffeeComponent {

  constructor(private coffeeService: CoffeeService, private router: Router) {}

  registerCoffeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
  });

  register() {
    const coffee: IRegisterCoffee = {
      name: this.registerCoffeeForm.value.name || '',
      price: this.registerCoffeeForm.value.price || 0,
    };    const saveCoffee: IRegisterCoffee = {
      name: coffee.name,
      price: coffee.price,
    };

    this.coffeeService.registerCoffee(saveCoffee).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Coffeesaved',
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
 