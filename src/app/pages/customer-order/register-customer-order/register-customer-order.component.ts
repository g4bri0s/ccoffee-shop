import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterOrder } from 'src/app/interfaces/registerCustomerOrder';
import { ICustomerOrder } from 'src/app/interfaces/customerOrder';
import { CustomerOrdersService } from 'src/app/services/customer-orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-customer-order',
  templateUrl: './register-customer-order.component.html',
  styleUrls: ['./register-customer-order.component.css'],
})
export class RegisterCustomerOrderComponent {

  constructor(private orderService: CustomerOrdersService, private router: Router) { }

  registerOrderForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    customerName: new FormControl('', Validators.required),
  });

  register() {
    const order: ICustomerOrder = {
      id: this.registerOrderForm.value.id || 0,
      customerName: this.registerOrderForm.value.customerName || '',
      items: null,
      total: null,
    };

    const saveOrder: IRegisterOrder = {
      customerName: order.customerName,
    };

    this.orderService.registerOrder(saveOrder).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Order saved',
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

  refreshPageAfterButton(redirectedPage: string) {
    setTimeout(() => {
      this.router.navigate([`${redirectedPage}`]);
    }, 2000);
  }

  cancel() {
    this.router.navigate(['/customerOrders']);
  }
}
