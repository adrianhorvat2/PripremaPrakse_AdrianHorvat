import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-filter-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-products.html',
  styleUrl: './filter-products.scss',
})

export class FilterProducts {

  products: Product[] = [
    { name: 'Prijenosno računalo', category: 'Elektronika', price: 950 },
    { name: 'Bežične slušalice', category: 'Elektronika', price: 120 },
    { name: 'Tipkovnica', category: 'Elektronika', price: 45 },
    { name: 'Uredska stolica', category: 'Namještaj', price: 320 },
    { name: 'Radni stol', category: 'Namještaj', price: 780 },
    { name: 'Šalica za kavu', category: 'Kućanstvo', price: 8 },
    { name: 'Tava za kuhanje', category: 'Kućanstvo', price: 35 },
    { name: 'Sportske tenisice', category: 'Odjeća i obuća', price: 95 },
    { name: 'Majica kratkih rukava', category: 'Odjeća i obuća', price: 18 },
    { name: 'Ruksak', category: 'Pribor', price: 60 }
  ];


  searchText: string = '';

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
