import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private localUsers: User[] = [];
  private nextId = 0;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => this.initializeNextId(users))
    );
  }

  addUser(name: string, email: string, phone: string): User {
    const newUser = this.createUser(name, email, phone);
    this.localUsers.push(newUser);
    return newUser;
  }

  getLocalUsers(): User[] {
    return this.localUsers;
  }

  private initializeNextId(users: User[]): void {
    if (users.length === 0) {
      this.nextId = 1;
      return;
    }
    const maxId = Math.max(...users.map(u => u.id));
    this.nextId = maxId + 1;
  }

  private createUser(name: string, email: string, phone: string): User {
    return {
      id: this.nextId++,
      name,
      email,
      phone,
      username: this.generateUsername(name),
      website: '',
      address: { street: '', suite: '', city: '', zipcode: '' },
      company: { name: '', catchPhrase: '', bs: '' }
    };
  }

  private generateUsername(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '.');
  }
}