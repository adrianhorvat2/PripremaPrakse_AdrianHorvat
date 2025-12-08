import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})

export class UserManagement implements OnInit {
  private readonly userService = inject(UserService);

  users: User[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Greška pri dohvaćanju korisnika.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
