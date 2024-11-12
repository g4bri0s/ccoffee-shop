import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoffeesComponent } from './pages/coffees/coffees.component'; 
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component'; 

@NgModule({
  declarations: [
    AppComponent,
    CoffeesComponent, 
    CustomerOrdersComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
