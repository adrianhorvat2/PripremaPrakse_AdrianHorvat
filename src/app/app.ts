import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './components/zad1/counter/counter';
import { FilterProducts } from './components/zad2/filter-products/filter-products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, FilterProducts],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PripremaPrakse_AdrianHorvat');
}
