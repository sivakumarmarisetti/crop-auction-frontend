import {
  AfterViewInit,
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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { AdminService } from '../services/admin.service';
import { UserResponseModel } from '../models/user-response.model';
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { PageToolbarComponent } from '../../../shared/ui/page-toolbar/page-toolbar';
import { SearchBarComponent } from '../../../shared/ui/search-bar/search-bar';
import { TableCard } from '../../../shared/ui/table-card/table-card';
import { StatusChip } from '../../../shared/ui/status-chip/status-chip';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { ApproveDialog } from '../../../shared/components/approve-dialog/approve-dialog';
import { RejectDialog } from '../../../shared/components/reject-dialog/reject-dialog';

@Component({
  selector: 'app-pending-users',
  standalone: true,
  imports: [
    CommonModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatFormFieldModule,
    MatInputModule,

    MatButtonModule,

    MatDialogModule,

    PageHeader,
    PageToolbarComponent,
    SearchBarComponent,
    TableCard,
    StatusChip,
    EmptyState
  ],
  templateUrl: './pending-users.html',
  styleUrl: './pending-users.scss'
})
export class PendingUsers
  implements OnInit, AfterViewInit {

  private adminService =
    inject(AdminService);

  private notificationService =
    inject(NotificationService);

  private dialog =
    inject(MatDialog);

    private cdr =
  inject(ChangeDetectorRef);

  displayedColumns = [
    'name',
    'email',
    'mobile',
    'role',
    'actions'
  ];

  dataSource =
    new MatTableDataSource<UserResponseModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  get hasUsers(): boolean {

    return this.dataSource.data.length > 0;

  }

  ngOnInit(): void {

    this.loadPendingUsers();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }

  loadPendingUsers(): void {

    this.adminService
      .getPendingUsers()
      .subscribe({

        next: (response) => {

          this.dataSource.data =
            [...response.data];
            this.cdr.detectChanges();

        },

        error: (error) => {

          this.notificationService.error(
            error.error?.message ??
            'Unable to load pending users.'
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

  approveUser(id: number): void {

    const dialogRef =
      this.dialog.open(
        ApproveDialog,
        {
          width: '400px',
          data: {
            message:
              'Approve this user?'
          }
        }
      );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.adminService
        .approveUser(id)
        .subscribe({

          next: (response) => {

            this.notificationService.success(
              response.message
            );

            this.loadPendingUsers();

          },

          error: (error) => {

            this.notificationService.error(
              error.error?.message ??
              'Unable to approve user.'
            );

          }

        });

    });

  }

  rejectUser(id: number): void {

    const dialogRef =
      this.dialog.open(
        RejectDialog,
        {
          width: '400px',
          data: {
            message:
              'Reject this user?'
          }
        }
      );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.adminService
        .rejectUser(id)
        .subscribe({

          next: (response) => {

            this.notificationService.success(
              response.message
            );

            this.loadPendingUsers();

          },

          error: (error) => {

            this.notificationService.error(
              error.error?.message ??
              'Unable to reject user.'
            );

          }

        });

    });

  }

}