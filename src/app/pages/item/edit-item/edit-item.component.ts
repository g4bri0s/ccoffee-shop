
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/interfaces/item';
import { ICoffee } from 'src/app/interfaces/coffee';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

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
  ) {}

  editItemForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    coffeeId: new FormControl(0, Validators.required),
    coffeeName: new FormControl('', Validators.required),
    coffeePrice: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.itemService.getItemById(id).subscribe((item: IItem) => {
        this.editItemForm.setValue({
          id: item.id,
          name: item.name,
          price: item.price,
          coffeeId: item.coffee.id,
          coffeeName: item.coffee.name,
          coffeePrice: item.coffee.price,
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

    const item: IItem = {
      id: this.editItemForm.value.id || 0,
      name: this.editItemForm.value.name || '',
      price: this.editItemForm.value.price || 0,
      coffee: {
        id: this.editItemForm.value.coffeeId || 0,
        name: this.editItemForm.value.coffeeName || '',
        price: this.editItemForm.value.coffeePrice || 0,
      } as ICoffee,
    };

    const saveItem: IItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      coffee: {
        id: item.coffee.id,
        name: item.coffee.name,
        price: item.coffee.price,
      } as ICoffee,
    };
    this.itemService.editItem(id, saveItem).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Item saved',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(function () {}, 2000);
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

  refreshPagAfterButton(redirectedPage: string) {
    setTimeout(() => {
      this.router.navigate([`${redirectedPage}`]);
    }, 2000);
  }
}
