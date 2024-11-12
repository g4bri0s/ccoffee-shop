import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from '../../services/customer-order.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
})
export class CustomerOrdersComponent implements OnInit {
  orders: any[] = [];             
  newOrder = { customerName: '' }; 
  editingOrder: any = null;       

  constructor(private orderService: CustomerOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe((data) => (this.orders = data));
  }

  onSubmit(): void {
    if (this.editingOrder) {
      this.updateOrder();
    } else {
      this.addOrder();
    }
  }

  addOrder(): void {
    this.orderService.create(this.newOrder).subscribe(() => {
      this.newOrder = { customerName: '' };
      this.loadOrders();
    });
  }

  updateOrder(): void {
    this.orderService.update(this.editingOrder.id, this.editingOrder).subscribe(() => {
      this.cancelEdit();
      this.loadOrders();
    });
  }

  deleteOrder(id: number): void {
    this.orderService.delete(id).subscribe(() => {
      this.loadOrders(); 
    });
  }

  editOrder(order: any): void {
    this.editingOrder = { ...order };
  }

  cancelEdit(): void {
    this.editingOrder = null;
  }
}
