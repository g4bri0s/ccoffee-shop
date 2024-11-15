import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoffee } from 'src/app/interfaces/coffee';
import { CoffeeService } from 'src/app/services/coffee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-coffee',
  templateUrl: './edit-coffee.component.html',
  styleUrls: ['./edit-coffee.component.css'],
})
export class EditCoffeeComponent {
  constructor(
    private coffeeService: CoffeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  editCoffeeForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.coffeeService.getCoffeeById(id).subscribe((coffee: ICoffee) => {
        this.editCoffeeForm.setValue({
          id: coffee.id,
          name: coffee.name,
          price: coffee.price,
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }

  edit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const coffee: ICoffee = {
      id: this.editCoffeeForm.value.id || 0,
      name: this.editCoffeeForm.value.name || '',
      price: this.editCoffeeForm.value.price || 0,
    };

    const saveCoffee: ICoffee = {
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
    };

    this.coffeeService.editCoffee(id, saveCoffee).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Coffee saved',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.router.navigate(['/coffees']);
        }, 2000);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    );
  }

  refreshPageAfterButton(redirectedPage: string) {
    setTimeout(() => {
      this.router.navigate([`${redirectedPage}`]);
    }, 2000);
  }

  cancelEdit() {
    this.router.navigate(['/coffees']);
  }
}
