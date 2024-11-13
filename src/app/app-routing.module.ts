import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeesComponent } from './pages/coffee/coffees/coffees.component';
import { RegisterCoffeeComponent } from './pages/coffee/register-coffee/register-coffee.component';

const routes: Routes = [
  { path: 'coffees', component: CoffeesComponent },
  { path: 'register-coffee', component: RegisterCoffeeComponent },
  //adicionar outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
