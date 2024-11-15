import { Component } from '@angular/core';
import { ICoffee } from 'src/app/interfaces/coffee';
import { CoffeeService } from 'src/app/services/coffee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
  styleUrls: ['./coffees.component.css'],
})
export class CoffeesComponent {
  coffees: ICoffee[] = [];
  constructor(private CoffeeService: CoffeeService) { }

  ngOnInit() {
    this.CoffeeService.getCoffees().subscribe((result: ICoffee[]) => {
      this.coffees = result;
    });
  }

  deleteCoffee(id: number) {
    this.CoffeeService.deleteCoffee(id).subscribe((coffees) => {
      this.CoffeeService.getCoffees();
    });
  }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  confirmDelete(id: number) {
    this.swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.swalWithBootstrapButtons.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The coffee has been deleted.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.deleteCoffee(id);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire({
            icon: 'error',
            title: 'Cancelled!',
            text: 'Coffee data is safe :)',
            timer: 2000,
          });
        }
      });
  }
}