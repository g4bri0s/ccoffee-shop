import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeesComponent } from './pages/coffee/coffees/coffees.component';
import { RegisterCoffeeComponent } from './pages/coffee/register-coffee/register-coffee.component';
import { EditCoffeeComponent } from './pages/coffee/edit-coffee/edit-coffee.component';
import { CustomerOrdersComponent } from './pages/customer-order/customer-orders/customer-orders.component';
import { RegisterCustomerOrderComponent } from './pages/customer-order/register-customer-order/register-customer-order.component';
import { EditCustomerOrderComponent } from './pages/customer-order/edit-customer-order/edit-customer-order.component';
import { ItemComponent } from './pages/item/itens/item.component';

const routes: Routes = [
  { path: 'coffees', component: CoffeesComponent },
  { path: 'coffee/new', component: RegisterCoffeeComponent },
  { path: 'coffees/:id', component: EditCoffeeComponent },
  { path: 'orders', component: CustomerOrdersComponent },
  { path: 'order/new', component: RegisterCustomerOrderComponent },
  { path: 'order/:id', component: EditCustomerOrderComponent },
  { path: 'itens', component: ItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
