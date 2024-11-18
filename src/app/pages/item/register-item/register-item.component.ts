import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { CoffeeService } from 'src/app/services/coffee.service';
import { CustomerOrdersService } from 'src/app/services/customer-orders.service';
import { IItemDto } from 'src/app/interfaces/itemSla';
import { ICoffee } from 'src/app/interfaces/coffee';
import { ICustomerOrder } from 'src/app/interfaces/customerOrder';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.css'],
})
export class RegisterItemComponent implements OnInit {
  customerOrder: ICustomerOrder | null = null;
  coffees: ICoffee[] = [];
  selectedCoffee: ICoffee | null = null;
  inputValue: number = 0.00;

  registerItemForm = new FormGroup({
    coffeeId: new FormControl(0, Validators.required),
    price: new FormControl(0),
    quantity: new FormControl(0, Validators.required),
  });

  constructor(
    private itemService: ItemService,
    private coffeeService: CoffeeService,
    private customerOrderService: CustomerOrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCoffees();
    this.loadCustomerOrder();
  }

  loadCoffees(): void {
    this.coffeeService.getCoffees().subscribe((coffees: ICoffee[]) => {
      this.coffees = coffees;
    });
  }

  loadCustomerOrder(): void {
    const customerOrderId = +this.route.snapshot.paramMap.get('id')!;

    if (customerOrderId) {
      this.customerOrderService.getOrderById(customerOrderId).subscribe(
        (order: ICustomerOrder) => {
          this.customerOrder = order;
        },
        (error) => {
          console.error('Error loading customer order', error);
        }
      );
    }
  }

  onCoffeeChange(): void {
    const coffeeId = this.registerItemForm.value.coffeeId;
    if (coffeeId) {
      this.coffeeService.getCoffeeById(coffeeId).subscribe(
        (coffeeFound: ICoffee) => {
          this.inputValue = coffeeFound.price;
        },
        (error) => {
          console.error('Error fetching coffee:', error);
          // Handle error if needed
        }
      );
    }
  }


  register(): void {
    if (!this.customerOrder) {
      console.error('No customer order found');
      return;
    }

    const item: IItemDto = {
      id: {
        customerOrderId: this.registerItemForm.value.coffeeId || 0,
        coffeeId: this.customerOrder.id,
      },
      coffee: {
        id: this.registerItemForm.value.coffeeId || 0,
        name: this.selectedCoffee?.name || '',
        price: this.selectedCoffee?.price || 0,
      } as ICoffee,
      customerOrder: this.customerOrder,
      quantity: this.registerItemForm.value.quantity || 0,
    };

    this.itemService.registerItem(item).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Item saved',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  cancel(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/customerOrders', orderId, 'details']);
  }
}
