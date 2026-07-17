import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../../features/auth/services/auth.service';
import { APP_ROUTES } from '../../constants/app-routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  private authService = inject(AuthService);

  private router = inject(Router);

  readonly currentUser = computed(() =>
    this.authService.currentUser()
  );

  logout(): void {

    this.authService.logout();

    this.router.navigate([APP_ROUTES.LOGIN]);

  }

}