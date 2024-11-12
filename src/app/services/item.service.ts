import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getByIds(customerOrderId: number, coffeeId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${customerOrderId}/${coffeeId}`
    );
  }

  create(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, item);
  }

  update(
    customerOrderId: number,
    coffeeId: number,
    item: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${customerOrderId}/${coffeeId}`,
      item
    );
  }

  delete(customerOrderId: number, coffeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${customerOrderId}/${coffeeId}`
    );
  }
}
