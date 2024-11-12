import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: any[] = [];
  newItem = { customerOrderId: null, coffeeId: null, quantity: 0 };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAll().subscribe((data) => (this.items = data));
  }

  addItem(): void {
    this.itemService.create(this.newItem).subscribe(() => {
      this.newItem = { customerOrderId: null, coffeeId: null, quantity: 0 };
      this.loadItems();
    });
  }

  deleteItem(customerOrderId: number, coffeeId: number): void {
    this.itemService
      .delete(customerOrderId, coffeeId)
      .subscribe(() => this.loadItems());
  }
}
