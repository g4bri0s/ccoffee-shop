
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/interfaces/item';
import { IItemDto } from 'src/app/interfaces/itemSla';
import { IItemId } from 'src/app/interfaces/itemId';
import { ICoffee } from 'src/app/interfaces/coffee';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';
import { ICustomerOrder } from 'src/app/interfaces/customerOrder';

@Component({
  selector: 'app-edit-coffee',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent {
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  editItemForm = new FormGroup({
    coffeeId: new FormControl(0, Validators.required),
    coffeeName: new FormControl('', Validators.required),
    coffeePrice: new FormControl(0, Validators.required),
    customerOrderId: new FormControl(0, Validators.required),
    customerOrderCustomerName: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    const id1 = Number(this.route.snapshot.paramMap.get('id1'));
    const id2 = Number(this.route.snapshot.paramMap.get('id2'));
    const itemId: IItemId = {
      customerOrderId: id1,
      coffeeId: id2,
    };

    if (itemId) {
      this.itemService.getItemById(itemId).subscribe((item: IItemDto) => {
        this.editItemForm.setValue({
          coffeeId: item.coffee.id,
          coffeeName: item.coffee.name,
          coffeePrice: item.coffee.price,
          customerOrderId: item.customerOrder.id,
          customerOrderCustomerName: item.customerOrder.customerName,
          quantity: item.quantity,
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
    const id1 = Number(this.route.snapshot.paramMap.get('id1'));
    const id2 = Number(this.route.snapshot.paramMap.get('id2'));
    const itemId: IItemId = {
      customerOrderId: id1,
      coffeeId: id2,
    };

    const item: IItemDto = {
      id: itemId,
      coffee: {
        id: this.editItemForm.value.coffeeId || 0,
        name: this.editItemForm.value.coffeeName || '',
        price: this.editItemForm.value.coffeePrice || 0,
      } as ICoffee,
      customerOrder: {
        id: this.editItemForm.value.customerOrderId || 0,
        customerName: this.editItemForm.value.customerOrderCustomerName || '',
        items: null,
        total: null,
      } as ICustomerOrder,
      quantity: this.editItemForm.value.quantity || 0,
    };

    const saveItem: IItemDto = {
      id: item.id,
      coffee: {
        id: item.coffee.id,
        name: item.coffee.name,
        price: item.coffee.price,
      } as ICoffee,
      customerOrder: {
        id: item.customerOrder.id,
        customerName: item.customerOrder.customerName,
        items: null,
        total: null,
      } as ICustomerOrder,
      quantity: item.quantity,
    };
    this.itemService.editItem(itemId, saveItem).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Item saved',
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
