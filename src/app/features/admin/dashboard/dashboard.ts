import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AdminService } from '../services/admin.service';
import { AdminDashboardResponseModel } from '../models/admin-dashboard-response.model';
import { NotificationService } from '../../../core/services/notification.service';

import { PageContainerComponent } from '../../../shared/ui/page-container/page-container';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatCard } from '../../../shared/ui/stat-card/stat-card';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    PageHeader,
    StatCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  private adminService =
    inject(AdminService);

  private notificationService =
    inject(NotificationService);

  private router =
    inject(Router);

  private cdr =
  inject(ChangeDetectorRef);

  dashboard?: AdminDashboardResponseModel;

  ngOnInit(): void {

    console.log('✅ Dashboard ngOnInit');

    this.loadDashboard();

  }

  loadDashboard(): void {

    console.log('📡 Calling Dashboard API...');

    this.adminService
      .getDashboard()
      .subscribe({

        next: (response) => {

          console.log('✅ Dashboard Response:', response);

          this.dashboard = response.data;
          this.cdr.detectChanges();

          console.log('Dashboard Data:', this.dashboard);

        },

        error: (error) => {

          console.error('❌ Dashboard Error:', error);

          this.notificationService.error(
            error.error?.message ??
            'Unable to load dashboard.'
          );

        }

      });

  }

  goToPendingUsers(): void {

    this.router.navigate([
      '/admin/pending-users'
    ]);

  }

  goToPendingAuctionRequests(): void {

    this.router.navigate([
      '/admin/pending-auction-requests'
    ]);

  }

  goToAuctions(): void {

    this.router.navigate([
      '/admin/auctions'
    ]);

  }

}