import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './components/zad1/counter/counter';
import { FilterProducts } from './components/zad2/filter-products/filter-products';
import { UserManagement } from './components/zad5/user-management/user-management';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, FilterProducts, UserManagement],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PripremaPrakse_AdrianHorvat');
}
