import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../features/auth/services/auth.service';

import { SIDEBAR_ITEMS } from '../constants/sidebar-items';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  private authService = inject(AuthService);

  readonly menuItems = computed(() => {

    const user = this.authService.currentUser();

    if (!user) {

      return [];

    }

    return SIDEBAR_ITEMS.filter(menu =>
      menu.roles.includes(user.role)
    );

  });

}