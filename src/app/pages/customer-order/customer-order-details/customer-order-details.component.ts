import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomerOrder } from 'src/app/interfaces/customerOrder';
import { IItemId } from 'src/app/interfaces/itemId';
import { CustomerOrdersService } from 'src/app/services/customer-orders.service';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css'],
})
export class CustomerOrderDetailsComponent implements OnInit {
  customerOrder!: ICustomerOrder;
  isLoading = true;

  constructor(
    private orderService: CustomerOrdersService,
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadCustomerOrder(+orderId);
    }
  }

  loadCustomerOrder(id: number) {
    this.orderService.getOrderById(id).subscribe({
      next: (result: ICustomerOrder) => {
        this.customerOrder = result;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading order:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load the order. Please try again later.',
        });
        this.isLoading = false;
      },
    });
  }

  deleteItem(itemId: IItemId) {
    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        this.customerOrder.items = this.customerOrder.items?.filter(
          (item) => item.id !== itemId
        ) || null;

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The item has been removed from the order.',
          timer: 2000,
        });
      },
      error: (err) => {
        console.error('Error deleting item:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the item. Please try again later.',
        });
      },
    });
  }

  confirmDelete(itemId: IItemId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(itemId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'error',
          title: 'Cancelled!',
          text: 'The item is safe.',
          timer: 2000,
        });
      }
    });
  }

  updateItemQuantity(itemId: IItemId, newQuantity: number) {
    if (newQuantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Quantity',
        text: 'Quantity must be greater than 0.',
        timer: 2000,
      });
      return;
    }
    
    this.itemService.updateItemQuantity(itemId, newQuantity).subscribe({
      next: () => {
        const item = this.customerOrder.items?.find((i) => i.id === itemId);
        if (item) {
          item.quantity = newQuantity;
        }
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'The quantity has been updated successfully.',
          timer: 2000,
        });
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update the quantity. Please try again later.',
        });
      },
    });
  }
}
