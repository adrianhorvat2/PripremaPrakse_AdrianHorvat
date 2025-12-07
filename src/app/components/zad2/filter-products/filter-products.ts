import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-filter-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-products.html',
  styleUrl: './filter-products.scss',
})

export class FilterProducts implements OnInit {

  private readonly productService = inject(ProductService);

  products: Product[] = [];
  categories: string[] = [];

  searchText: string = '';
  selectedCategory: string = '';

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.categories = this.productService.getCategories();
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }
}
