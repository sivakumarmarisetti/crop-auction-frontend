import {
  Component,
  OnInit,
  ViewChild,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule
} from '@angular/material/sort';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AdminService } from '../services/admin.service';

import { AuctionRequestResponseModel } from '../../farmer/models/auction-request-response.model';

import { NotificationService } from '../../../core/services/notification.service';

import { AdminCommentsDialog } from '../../../shared/components/admin-comments-dialog/admin-comments-dialog';

import { PageContainerComponent } from '../../../shared/ui/page-container/page-container';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { PageToolbarComponent } from '../../../shared/ui/page-toolbar/page-toolbar';
import { SearchBarComponent } from '../../../shared/ui/search-bar/search-bar';
import { TableCard } from '../../../shared/ui/table-card/table-card';
import { StatusChip } from '../../../shared/ui/status-chip/status-chip';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-pending-auction-requests',
  standalone: true,
  imports: [
    CommonModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,

    PageContainerComponent,
    PageHeader,
    PageToolbarComponent,
    SearchBarComponent,
    TableCard,
    StatusChip,
    EmptyState
  ],
  templateUrl: './pending-auction-requests.html',
  styleUrl: './pending-auction-requests.scss'
})
export class PendingAuctionRequests implements OnInit {

  private adminService = inject(AdminService);

  private notificationService =
    inject(NotificationService);

  private dialog =
    inject(MatDialog);

    private cdr =
  inject(ChangeDetectorRef);

  displayedColumns = [
    'cropName',
    'status',
    'requestedAt',
    'farmerRemarks',
    'actions'
  ];

  dataSource =
    new MatTableDataSource<AuctionRequestResponseModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadRequests();

  }

  loadRequests(): void {

    this.adminService
      .getPendingAuctionRequests()
      .subscribe({

        next: (response) => {

          this.dataSource.data =
            response.data;
            this.cdr.detectChanges();

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (error) => {

          this.notificationService.error(

            error.error?.message ??

            'Unable to load auction requests.'

          );

        }

      });

  }

  applyFilter(event: Event): void {

    const value =
      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =
      value.trim().toLowerCase();

  }

  approve(requestId: number): void {

    const dialogRef =
      this.dialog.open(
        AdminCommentsDialog,
        {
          width: '500px',
          data: {
            action: 'Approve'
          }
        });

    dialogRef.afterClosed().subscribe(comments => {

      if (!comments) {
        return;
      }

      this.adminService
        .approveAuctionRequest(
          requestId,
          comments
        )
        .subscribe({

          next: (response) => {

            this.notificationService.success(
              response.message
            );

            this.loadRequests();

          },

          error: (error) => {

            this.notificationService.error(
              error.error?.message ??
              'Unable to approve request.'
            );

          }

        });

    });

  }

  reject(requestId: number): void {

    const dialogRef =
      this.dialog.open(
        AdminCommentsDialog,
        {
          width: '500px',
          data: {
            action: 'Reject'
          }
        });

    dialogRef.afterClosed().subscribe(comments => {

      if (!comments) {
        return;
      }

      this.adminService
        .rejectAuctionRequest(
          requestId,
          comments
        )
        .subscribe({

          next: (response) => {

            this.notificationService.success(
              response.message
            );

            this.loadRequests();

          },

          error: (error) => {

            this.notificationService.error(
              error.error?.message ??
              'Unable to reject request.'
            );

          }

        });

    });

  }

}