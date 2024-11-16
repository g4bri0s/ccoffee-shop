import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IItem } from '../interfaces/item';
import { EMPTY, Observable, map, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IRegisterItem } from '../interfaces/registerItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getItem = 'items';
  api = environment.api;

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<IItem[]>(`${this.api}/${this.getItem}`);
  }

  getItemById(id: number) {
    return this.http.get<IItem>(`${this.api}/${this.getItem}/${id}`);
  }

  existItemById(id: number): Observable<boolean> {
    return this.http
      .get<IItem>(`${this.api}/${this.getItem}/${id}`)
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

  registerItem(iten: IRegisterItem): Observable<any> {
    return this.http.post(`${this.api}/${this.getItem}`, iten).pipe(
      tap(() => {
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  editItem(id: number, iten: IItem) {
    return this.http.put(`${this.api}/${this.getItem}/${id}`, iten);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.api}/${this.getItem}/${id}`);
  }
}
