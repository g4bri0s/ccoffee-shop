import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IItem } from '../interfaces/item';
import { IItemDto } from '../interfaces/itemSla';
import { EMPTY, Observable, map, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IRegisterItem } from '../interfaces/registerItem';
import { IItemId } from '../interfaces/itemId';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getItem = 'items';
  api = environment.api;

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<IItemDto[]>(`${this.api}/${this.getItem}`);
  }

  getItemById(itemId: IItemId) {
    return this.http.get<IItemDto>(`${this.api}/${this.getItem}/${itemId.customerOrderId}/${itemId.coffeeId}`);
  }

  getItemsByOrderId(orderId: number) {
    return this.http.get<IItemDto[]>(`${this.api}/customerOrders/${orderId}`);
  }  

  existItemById(itemId: IItemId): Observable<boolean> {
    return this.http
      .get<IItem>(`${this.api}/${this.getItem}/${itemId.customerOrderId}/${itemId.coffeeId}`)
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

  registerItem(item: IItemDto): Observable<any> {
    return this.http.post(`${this.api}/${this.getItem}`, item).pipe(
      tap(() => {
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  editItem(itemId: IItemId, item: IItemDto) {
    return this.http.put(`${this.api}/${this.getItem}/${itemId.customerOrderId}/${itemId.coffeeId}`, item);
  }

  deleteItem(itemId: IItemId) {
    return this.http.delete(`${this.api}/${this.getItem}/${itemId.customerOrderId}/${itemId.coffeeId}`);
  }

  updateItemQuantity(itemId: IItemId, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.api}/items/${itemId}`, { quantity });
  }  
}
