import { Component } from '@angular/core';
import { IOrder } from 'src/app/interfaces/customerOrder';

import { CustomerOrdersService } from 'src/app/services/customer-orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
})
export class CustomerOrdersComponent {
  order: IOrder[] = [];
  constructor(private orderService: CustomerOrdersService) {}

  ngOnInit() {
    this.orderService.getOrder().subscribe((result: IOrder[]) => {
      this.order = result;
    });
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe((order) => {
      this.orderService.getOrder();
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
            text: 'The order has been deleted.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.deleteOrder(id);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire({
            icon: 'error',
            title: 'Cancelled!',
            text: 'Order data is safe :)',
            timer: 2000,
          });
        }
      });
  }
}