import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICoffee } from '../interfaces/coffee';
import { IRegisterCoffee } from 'src/app/interfaces/registerCoffee';
import { EMPTY, Observable, map, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  getCoffee = 'coffees';
  api = environment.api;

  constructor(private http: HttpClient) {}

  getCoffees() {
    return this.http.get<ICoffee[]>(`${this.api}/${this.getCoffee}`);
  }

  getCoffeeBId(id: number) {
    return this.http.get<ICoffee>(`${this.api}/${this.getCoffee}/${id}`);
  }

  existCoffeeById(id: number): Observable<boolean> {
    return this.http
      .get<ICoffee>(`${this.api}/${this.getCoffee}/${id}`)
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

  registerCoffee(coffee: IRegisterCoffee): Observable<any> {
    return this.http.post(`${this.api}/${this.getCoffee}`, coffee).pipe(
      tap(() => {
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  editCoffee(id: number, coffee: ICoffee) {
    return this.http.put(`${this.api}/${this.getCoffee}/${id}`, coffee);
  }

  deleteCoffee(id: number) {
    return this.http.delete(`${this.api}/${this.getCoffee}/${id}`);
  }
}