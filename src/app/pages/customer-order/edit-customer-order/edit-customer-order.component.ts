
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/interfaces/customerOrder';
import { CustomerOrdersService } from 'src/app/services/customer-orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer-order',
  templateUrl: './edit-customer-order.component.html',
  styleUrls: ['./edit-customer-order.component.css'],
})
export class EditCustomerOrderComponent {
  constructor(
    private orderService: CustomerOrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  editOrderForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.orderService.getOrderById(id).subscribe((order: IOrder) => {
        this.editOrderForm.setValue({
          id: order.id,
          name: order.customerName,
          price: 0,
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

    const order: IOrder = {
      id: this.editOrderForm.value.id || 0,
      customerName: this.editOrderForm.value.name || '',
    };

    const saveOrder: IOrder = {
      id: order.id,
      customerName: order.customerName,
    };
    this.orderService.editOrder(id, saveOrder).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Order saved',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(function () { }, 2000);
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

  cancel() {
    this.router.navigate(['/customerOrders']);
  }
}