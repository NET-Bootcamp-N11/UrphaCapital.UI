import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../../interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/products'; // URL to web API

  constructor(private http: HttpClient) { }

  // Fetch products from the API
  getProductsSmall(): Promise<Product[]> {
    return this.http.get<any>(this.productsUrl)
      .pipe(
        map(products => products || []), // Ensure the return type is always Product[]
        catchError(this.handleError<Product[]>('getProductsSmall', []))
      )
      .toPromise();
  }

  // Handle HTTP operation that failed
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
