import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { Dashboard } from '../services/dashboard.service';

import { NotificationService } from '../../../core/services/notification.service';

import { FarmerDashboardResponseModel } from '../models/farmer-dashboard-response.model';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatCard } from '../../../shared/ui/stat-card/stat-card';
import { TableCard } from '../../../shared/ui/table-card/table-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,

    MatTableModule,

    PageHeader,
    StatCard,
    TableCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  private dashboardService =
    inject(Dashboard);

  private notificationService =
    inject(NotificationService);
  
  private cdr =
  inject(ChangeDetectorRef);

  dashboard?: FarmerDashboardResponseModel;

  displayedColumns = [

    'cropName',

    'category',

    'quantity',

    'expectedPrice',

    'status'

  ];

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService
      .getDashboard()
      .subscribe({

        next: (response) => {

          this.dashboard = response.data;
          this.cdr.detectChanges();

        },

        error: (error) => {

          this.notificationService.error(

            error.error?.message ??

            'Unable to load dashboard.'

          );

        }

      });

  }

}