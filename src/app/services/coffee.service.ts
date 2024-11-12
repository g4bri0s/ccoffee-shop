import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  private baseUrl = 'http://localhost:8080/coffees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(coffee: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, coffee);
  }

  update(id: number, coffee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, coffee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
