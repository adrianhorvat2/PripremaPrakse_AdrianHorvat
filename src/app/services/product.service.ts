import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private readonly products: Product[] = [
    { name: 'Prijenosno računalo', category: 'Elektronika', price: 950 },
    { name: 'Bežične slušalice', category: 'Elektronika', price: 120 },
    { name: 'Tipkovnica', category: 'Elektronika', price: 45 },
    { name: 'Uredska stolica', category: 'Namještaj', price: 320 },
    { name: 'Radni stol', category: 'Namještaj', price: 780 },
    { name: 'Šalica za kavu', category: 'Kućanstvo', price: 8 },
    { name: 'Tava', category: 'Kućanstvo', price: 35 },
    { name: 'Sportske tenisice', category: 'Odjeća i obuća', price: 95 },
    { name: 'Majica kratkih rukava', category: 'Odjeća i obuća', price: 18 },
    { name: 'Ruksak', category: 'Pribor', price: 60 }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getCategories(): string[] {
    const categories = this.products.map(p => p.category);
    return [...new Set(categories)];
  }
}
