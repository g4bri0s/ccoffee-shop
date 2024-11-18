import { Component } from '@angular/core';
import { IItemId } from 'src/app/interfaces/itemId';
import { IItemDto } from 'src/app/interfaces/itemSla';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  items: IItemDto[] = [];
  constructor(private ItemService: ItemService) { }

  ngOnInit() {
    this.ItemService.getItems().subscribe((result: IItemDto[]) => {
      this.items = result;
    });
  }

  deleteItem(itemId: IItemId) {
    this.ItemService.deleteItem(itemId).subscribe((items) => {
      this.ItemService.getItems();
    });
  }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  confirmDelete(itemId: IItemId) {
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
            text: 'The item has been deleted.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.deleteItem(itemId);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire({
            icon: 'error',
            title: 'Cancelled!',
            text: 'Item data is safe :)',
            timer: 2000,
          });
        }
      });
  }
}