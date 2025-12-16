import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter-products',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './filter-products.html',
  styleUrl: './filter-products.scss',
})

export class FilterProducts implements OnInit {

  private readonly productService = inject(ProductService);

  products: Product[] = [];
  categories: string[] = [];

  searchText: string = '';
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortOption: string = '';

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.categories = this.productService.getCategories();
  }

  get filteredProducts(): Product[] {
    const filtered = this.filterProducts();
    return this.sortProducts(filtered);
  }

  private filterProducts(): Product[] {
    return this.products.filter(product => {
      return this.matchesSearchCriteria(product) && 
             this.matchesCategoryCriteria(product) && 
             this.matchesPriceCriteria(product);
    });
  }
  
  private matchesSearchCriteria(product: Product): boolean {
    return product.name
      .toLowerCase()
      .includes(this.searchText.toLowerCase());
  }

  private matchesCategoryCriteria(product: Product): boolean {
    return !this.selectedCategory || product.category === this.selectedCategory;
  }

  private matchesPriceCriteria(product: Product): boolean {

    const matchesMinPrice = this.minPrice === null || product.price >= this.minPrice;
    const matchesMaxPrice = this.maxPrice === null || product.price <= this.maxPrice;

    return matchesMinPrice && matchesMaxPrice;
  }

  private sortProducts(products: Product[]): Product[] {
    if (!this.sortOption) return products;

    const sorted = [...products];

    switch (this.sortOption) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));

      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);

      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);

      default:
        return products;
    }
  }
  
}
