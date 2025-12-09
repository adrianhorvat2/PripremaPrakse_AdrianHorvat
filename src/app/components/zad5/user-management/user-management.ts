import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement implements OnInit {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  userForm!: FormGroup;
  users: User[] = [];
  loading = true;
  error: string | null = null;
  submitSuccess = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
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

  onSubmit(): void {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      return;
    }

    const { name, email, phone } = this.userForm.value;
    const newUser = this.userService.addUser(name, email, phone || '');
    this.users = [...this.users, newUser];
    
    this.userForm.reset();
    this.submitSuccess = true;
    setTimeout(() => this.submitSuccess = false, 3000);
  }

  get nameControl() {
    return this.userForm.get('name');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get nameError(): string {
    if (this.nameControl?.hasError('required')) {
      return 'Ime je obavezno.';
    }
    if (this.nameControl?.hasError('minlength')) {
      return 'Ime mora sadržavati najmanje 3 znaka.';
    }
    return '';
  }

  get emailError(): string {
    if (this.emailControl?.hasError('required')) {
      return 'Email je obavezan.';
    }
    if (this.emailControl?.hasError('email')) {
      return 'Unesite validan email.';
    }
    return '';
  }
}
