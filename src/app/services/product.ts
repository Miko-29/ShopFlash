import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  description: string;
  images: string[];
  originalPrice?: number;
  endsIn?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  products: Product[] = [];

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products) =>
        products.map((p) => {
          const markup = 1 + Math.random() * 0.5;
          const fakeOriginal = p.price * markup;

          return {
            ...p,
            originalPrice: parseInt(fakeOriginal.toFixed(0)),
            endsIn: this.getRandomTime(),
          };
        }),
      ),
      tap((data) => (this.products = data)),
    );
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === Number(id));
  }

  private getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const mins = Math.floor(Math.random() * 60);
    return `${hours}h ${mins}m`;
  }
}
