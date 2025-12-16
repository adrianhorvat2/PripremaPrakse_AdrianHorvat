import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Counter } from './components/zad1/counter/counter';
import { FilterProducts } from './components/zad2/filter-products/filter-products';
import { UserManagement } from './components/zad5/user-management/user-management';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'zad1', component: Counter },
  { path: 'zad2', component: FilterProducts },
  { path: 'zad5', component: UserManagement },
];