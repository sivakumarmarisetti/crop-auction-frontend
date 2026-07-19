import {
  Component,
  OnInit,
  AfterViewInit,
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

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuctionRequestService } from '../services/auction-request.service';
import { AuctionRequestResponseModel } from '../models/auction-request-response.model';

import { NotificationService } from '../../../core/services/notification.service';

import { AuctionRequestStatusColorPipe } from '../../../shared/pipes/auction-request-status-color-pipe';

import { PageContainerComponent } from '../../../shared/ui/page-container/page-container';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { PageToolbarComponent } from '../../../shared/ui/page-toolbar/page-toolbar';
import { SearchBarComponent } from '../../../shared/ui/search-bar/search-bar';
import { TableCard } from '../../../shared/ui/table-card/table-card';
import { StatusChip } from '../../../shared/ui/status-chip/status-chip';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-my-auction-requests',
  standalone: true,
  imports: [
    CommonModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatInputModule,
    MatFormFieldModule,

    AuctionRequestStatusColorPipe,

    PageContainerComponent,
    PageHeader,
    PageToolbarComponent,
    SearchBarComponent,
    TableCard,
    StatusChip,
    EmptyState
  ],
  templateUrl: './my-auction-requests.html',
  styleUrl: './my-auction-requests.scss'
})
export class MyAuctionRequests implements OnInit, AfterViewInit {

  private auctionRequestService = inject(AuctionRequestService);
  private notificationService = inject(NotificationService);
  private cdr =
  inject(ChangeDetectorRef);

  displayedColumns = [
    'cropName',
    'status',
    'requestedAt',
    'approvedAt',
    'farmerRemarks',
    'adminComments'
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

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) => {

      const value = (
        data.cropName +
        data.status +
        (data.farmerRemarks ?? '') +
        (data.adminComments ?? '')
      ).toLowerCase();

      return value.includes(filter);

    };

  }

  loadRequests(): void {

    this.auctionRequestService
      .getMyRequests()
      .subscribe({

        next: (response) => {

          this.dataSource.data = response.data;
          this.cdr.detectChanges();

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

    const value = (event.target as HTMLInputElement)
      .value
      .trim()
      .toLowerCase();

    this.dataSource.filter = value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}