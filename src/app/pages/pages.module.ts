import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CoffeesComponent } from './coffees/coffees.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { ItemsComponent } from './items/items.component';


@NgModule({
  declarations: [
    CoffeesComponent,
    CustomerOrdersComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
