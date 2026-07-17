import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthLayout } from '../../../shared/ui/auth/auth-layout/auth-layout';
import { AuthCard } from '../../../shared/ui/auth/auth-card/auth-card';
import { AuthHeader } from '../../../shared/ui/auth/auth-header/auth-header';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-buyer-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    AuthLayout,
    AuthCard,
    AuthHeader
  ],
  templateUrl: './buyer-register.html',
  styleUrl: './buyer-register.scss'
})
export class BuyerRegister {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

private notificationService = inject(NotificationService);

private router = inject(Router);

 registerForm = this.fb.group({

  name: ['', Validators.required],

  companyName: ['', Validators.required],

  email: ['', [Validators.required, Validators.email]],

  mobile: ['', Validators.required],

  aadhaarNumber: ['', Validators.required],

  password: ['', [Validators.required, Validators.minLength(6)]],

  confirmPassword: ['', Validators.required]

});

register(): void {

  if (this.registerForm.invalid) {

    this.registerForm.markAllAsTouched();

    return;

  }

  this.authService
      .registerBuyer(this.registerForm.getRawValue())
      .subscribe({

        next: (response) => {

          this.notificationService.success(response.message);

          this.router.navigate(['/login']);

        },

        error: (error) => {

          this.notificationService.error(
            error.error?.message ??
            'Registration failed.'
          );

        }

      });

}

}