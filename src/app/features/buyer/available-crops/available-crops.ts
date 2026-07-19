import {
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

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

import { MatButtonModule } from '@angular/material/button';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { BuyerService } from '../services/buyer.service';
import { AuctionSummaryModel } from '../models/auction-summary.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-available-crops',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './available-crops.html',
  styleUrl: './available-crops.scss'
})
export class AvailableCrops implements OnInit {

  private buyerService = inject(BuyerService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  displayedColumns = [
    'cropName',
    'category',
    'quantity',
    'currentHighestBid',
    'endTime',
    'actions'
  ];

  dataSource = new MatTableDataSource<AuctionSummaryModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.loadActiveAuctions();
  }

  loadActiveAuctions(): void {

    this.buyerService
      .getActiveAuctions()
      .subscribe({

        next: (response) => {

          this.dataSource.data = response;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },

        error: (err) => {

          this.notificationService.error(
            err.error?.message ??
            'Unable to load active auctions.'
          );

        }

      });

  }

  applyFilter(event: Event): void {

    const value = (event.target as HTMLInputElement)
      .value;

    this.dataSource.filter =
      value.trim().toLowerCase();

  }

viewDetails(auction: AuctionSummaryModel): void {

    console.log(auction);

    console.log(auction.auctionId);

    this.router.navigate([
      '/buyer/crop-details',
      auction.auctionId
    ]);

}

}