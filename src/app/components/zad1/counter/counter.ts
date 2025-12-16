import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-counter',
  imports: [RouterLink],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {

  count = signal(0);

  increment(){
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }
  
}
