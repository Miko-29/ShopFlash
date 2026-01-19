import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  category: 'electronics' | 'fashion';
  price: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: '101',
      name: 'Noise Cancelling Headphones',
      category: 'electronics',
      price: 299,
      image: 'https://placehold.co/150x150/333/fff?text=Headphones', // Placeholder image
      description: 'Best in class sound quality.',
    },
    {
      id: '102',
      name: 'Limited Edition Sneakers',
      category: 'fashion',
      price: 120,
      image: 'https://placehold.co/150x150/orange/white?text=Sneakers',
      description: 'Comfort meets style.',
    },
    {
      id: '103',
      name: 'Smart Watch Series 7',
      category: 'electronics',
      price: 399,
      image: 'https://placehold.co/150x150/blue/white?text=Watch',
      description: 'Track your fitness goals.',
    },
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find((p) => p.id === id);
  }
}
