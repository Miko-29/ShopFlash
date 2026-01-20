import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  category: 'electronics' | 'fashion';
  imageUrl: string;
  price: number;
  originalPrice: number;
  endsIn: string; // e.g., "2h 15m"
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 'prod_101',
      name: 'Sony WH-1000XM5',
      category: 'electronics',
      imageUrl: 'https://placehold.co/600x400/222/FFF?text=Sony+Headphones',
      price: 299,
      originalPrice: 399,
      endsIn: '2h 10m',
    },
    {
      id: 'prod_102',
      name: 'Nike Air Zoom',
      category: 'fashion',
      imageUrl: 'https://placehold.co/600x400/e63946/FFF?text=Nike+Air',
      price: 89,
      originalPrice: 129,
      endsIn: '45m',
    },
    {
      id: 'prod_103',
      name: 'Samsung Galaxy Watch 6',
      category: 'electronics',
      imageUrl: 'https://placehold.co/600x400/111/FFF?text=Galaxy+Watch',
      price: 199,
      originalPrice: 249,
      endsIn: '5h 00m',
    },
    {
      id: 'prod_104',
      name: 'Denim Jacket Vintage',
      category: 'fashion',
      imageUrl: 'https://placehold.co/600x400/457b9d/FFF?text=Denim+Jacket',
      price: 59,
      originalPrice: 99,
      endsIn: '1h 30m',
    },
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
