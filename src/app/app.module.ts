import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterCustomerOrderComponent } from './pages/customer-order/register-customer-order/register-customer-order.component';
import { EditCustomerOrderComponent } from './pages/customer-order/edit-customer-order/edit-customer-order.component';
import { CustomerOrdersComponent } from './pages/customer-order/customer-orders/customer-orders.component';
import { RegisterCoffeeComponent } from './pages/coffee/register-coffee/register-coffee.component';
import { CoffeesComponent } from './pages/coffee/coffees/coffees.component';
import { AppRoutingModule } from './app-routing.module';
import { EditCoffeeComponent } from './pages/coffee/edit-coffee/edit-coffee.component';
import { ItemComponent } from './pages/item/items/item.component';
import { EditItemComponent } from './pages/item/edit-item/edit-item.component';
import { RegisterItemComponent } from './pages/item/register-item/register-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterCustomerOrderComponent,
    EditCustomerOrderComponent,
    CustomerOrdersComponent,
    RegisterCoffeeComponent,
    CoffeesComponent,
    EditCoffeeComponent,
    ItemComponent,
    EditItemComponent,
    RegisterItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
