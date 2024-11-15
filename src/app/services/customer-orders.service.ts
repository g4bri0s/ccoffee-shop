import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/interfaces/customerOrder';
import { IRegisterOrder } from 'src/app/interfaces/registerCustomerOrder';
import { EMPTY, Observable, map, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrdersService {
  getOrders = 'customerOrders';
  api = environment.api;

  constructor(private http: HttpClient) {}

  getOrder() {
    return this.http.get<IOrder[]>(`${this.api}/${this.getOrders}`);
  }

  getOrderById(id: number) {
    return this.http.get<IOrder>(`${this.api}/${this.getOrders}/${id}`);
  }

  existOrderById(id: number): Observable<boolean> {
    return this.http
      .get<IOrder>(`${this.api}/${this.getOrders}/${id}`)
      .pipe(
        map((response) => {
          return response !== null;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of(false);
          } else {
            throw error;
          }
        }),
        map((exists) => {
          return exists as boolean;
        })
      );
  }

  registerOrder(order: IRegisterOrder): Observable<any> {
    return this.http.post(`${this.api}/${this.getOrders}`, order).pipe(
      tap(() => {
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  editOrder(id: number, order: IOrder) {
    return this.http.put(`${this.api}/${this.getOrders}/${id}`, order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.api}/${this.getOrders}/${id}`);
  }
}