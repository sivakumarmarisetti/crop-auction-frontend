import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Role } from '../models/role.model';
import { APP_ROUTES } from '../../../core/constants/app-routes';
import { AuthLayout } from '../../../shared/ui/auth/auth-layout/auth-layout';
import { AuthCard } from '../../../shared/ui/auth/auth-card/auth-card';
import { AuthHeader } from '../../../shared/ui/auth/auth-header/auth-header';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
     CommonModule,
  ReactiveFormsModule,
  RouterModule,

  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,

  AuthLayout,
  AuthCard,
  AuthHeader
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  hidePassword = true;

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue())
      .subscribe({

        next: (response) => {

          this.notificationService.success(response.message);

      switch (response.data.role) {

  case Role.ADMIN:
    this.router.navigate([APP_ROUTES.ADMIN.DASHBOARD]);
    break;

  case Role.FARMER:
    this.router.navigate([APP_ROUTES.FARMER.DASHBOARD]);
    break;

  case Role.BUYER:
    this.router.navigate([APP_ROUTES.BUYER.DASHBOARD]);
    break;

}

        },

        error: (error) => {

          this.notificationService.error(
            error.error?.message ?? 'Login failed'
          );

        }

      });

  }

}