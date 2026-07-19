import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { BuyerDashboardService } from '../services/buyer-dashboard.service';

import { BuyerDashboardResponseModel } from '../models/buyer-dashboard-response.model';

import { NotificationService } from '../../../core/services/notification.service';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  private dashboardService =
    inject(BuyerDashboardService);

  private notificationService =
    inject(NotificationService);

    private cdr =
      inject(ChangeDetectorRef);

  dashboard?: BuyerDashboardResponseModel;

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService
      .getDashboard()
      .subscribe({

        next: response => {

          this.dashboard = response.data;
          this.cdr.detectChanges();

        },

        error: err => {

          this.notificationService.error(

            err.error?.message ??

            'Unable to load dashboard.'

          );

        }

      });

  }

}