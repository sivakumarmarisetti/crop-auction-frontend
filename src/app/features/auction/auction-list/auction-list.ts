import {
  Component,
  OnInit,
  ViewChild,
  inject
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

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { AuctionService } from '../services/auction.service';
import { AuctionSummaryModel } from '../../buyer/models/auction-summary.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './auction-list.html',
  styleUrl: './auction-list.scss'
})
export class AuctionList implements OnInit {

  private auctionService = inject(AuctionService);
  private notificationService = inject(NotificationService);

  displayedColumns = [
    'auctionCode',
    'cropName',
    'category',
    'farmerName',
    'startingPrice',
    'currentHighestBid',
    'status',
    'endTime'
  ];

  dataSource =
    new MatTableDataSource<AuctionSummaryModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadAuctions();

  }

  loadAuctions(): void {

    this.auctionService
      .getAllAuctions()
      .subscribe({

        next: response => {

          this.dataSource.data = response;

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: error => {

          this.notificationService.error(

            error.error?.message ??

            'Unable to load auctions.'

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

}