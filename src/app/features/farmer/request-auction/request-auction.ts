import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FarmerService } from '../services/farmer.service';
import { AuctionRequestService } from '../services/auction-request.service';

import { NotificationService } from '../../../core/services/notification.service';

import { CropResponseModel } from '../models/crop-response.model';
import { ApiResponseModel } from '../../../core/models/api-response.model';

@Component({
  selector: 'app-request-auction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './request-auction.html',
  styleUrl: './request-auction.scss'
})
export class RequestAuction implements OnInit, AfterViewInit {

  private farmerService = inject(FarmerService);
  private auctionRequestService = inject(AuctionRequestService);
  private notificationService = inject(NotificationService);

  remarks = new FormControl('', { nonNullable: true });

  displayedColumns: string[] = [
    'cropName',
    'category',
    'quantity',
    'expectedPrice',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<CropResponseModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.loadCrops();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCrops(): void {

    this.farmerService.getMyCrops().subscribe({

      next: (response: ApiResponseModel<CropResponseModel[]>) => {

        this.dataSource.data = response.data;

      },

      error: (error: HttpErrorResponse) => {

        this.notificationService.error(
          error.error?.message ?? 'Unable to load crops.'
        );

      }

    });

  }

  requestAuction(crop: CropResponseModel): void {

    this.auctionRequestService.requestAuction({

      cropId: crop.id,
      farmerRemarks: this.remarks.value

    }).subscribe({

      next: () => {

        this.notificationService.success(
          'Auction request submitted successfully.'
        );

        this.remarks.setValue('');

        this.loadCrops();

      },

      error: (error: HttpErrorResponse) => {

        this.notificationService.error(
          error.error?.message ?? 'Unable to request auction.'
        );

      }

    });

  }

}