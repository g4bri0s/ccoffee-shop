import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeesComponent } from './pages/coffees/coffees.component'; // Importe o CoffeesComponent
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component'; // Importe o CustomerOrdersComponent

const routes: Routes = [
  { path: 'coffee', component: CoffeesComponent },
  { path: 'customer-orders', component: CustomerOrdersComponent },
  { path: '', redirectTo: '/coffee', pathMatch: 'full' },  // Alterado para /coffee
  { path: '**', redirectTo: '/coffee' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
