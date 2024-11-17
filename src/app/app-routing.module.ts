import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeesComponent } from './pages/coffee/coffees/coffees.component';
import { RegisterCoffeeComponent } from './pages/coffee/register-coffee/register-coffee.component';
import { EditCoffeeComponent } from './pages/coffee/edit-coffee/edit-coffee.component';
import { CustomerOrdersComponent } from './pages/customer-order/customer-orders/customer-orders.component';
import { RegisterCustomerOrderComponent } from './pages/customer-order/register-customer-order/register-customer-order.component';
import { EditCustomerOrderComponent } from './pages/customer-order/edit-customer-order/edit-customer-order.component';
import { CustomerOrderDetailsComponent } from './pages/customer-order/customer-order-details/customer-order-details.component';
import { ItemComponent } from './pages/item/items/item.component';
import { RegisterItemComponent } from './pages/item/register-item/register-item.component';
import { EditItemComponent } from './pages/item/edit-item/edit-item.component';

const routes: Routes = [
  { path: 'coffees', component: CoffeesComponent },
  { path: 'coffees/new', component: RegisterCoffeeComponent },
  { path: 'coffees/:id', component: EditCoffeeComponent },
  { path: 'customerOrders', component: CustomerOrdersComponent },
  { path: 'customerOrders/new', component: RegisterCustomerOrderComponent },
  { path: 'customerOrders/:id', component: EditCustomerOrderComponent },
  { path: 'customerOrders/:id', component: CustomerOrderDetailsComponent },
  { path: 'items', component: ItemComponent },
  { path: 'items/new', component: RegisterItemComponent },
  { path: 'items/:id1/:id2', component: EditItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
