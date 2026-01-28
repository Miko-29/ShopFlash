import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Category {
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
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.escuelajs.co/api/v1/categories';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      map((categories) =>
        categories.map((p) => {
          // 1. Calculate a fake "Original Price" (e.g., 1.2x to 1.5x the real price)
          const markup = 1 + Math.random() * 0.5; // Random markup between 0% and 50%
          const fakeOriginal = p.price * markup;

          return {
            ...p,
            // Round to 2 decimals
            originalPrice: parseFloat(fakeOriginal.toFixed(2)),
            endsIn: this.getRandomTime(),
          };
        }),
      ),
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`).pipe(
      map((p) => {
        // We need to regenerate it here since the API doesn't save our fake data
        const markup = 1.3;
        const fakeOriginal = p.price * markup;

        return {
          ...p,
          originalPrice: parseFloat(fakeOriginal.toFixed(2)),
          endsIn: '2h 00m',
        };
      }),
    );
  }

  private getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const mins = Math.floor(Math.random() * 60);
    return `${hours}h ${mins}m`;
  }
}
