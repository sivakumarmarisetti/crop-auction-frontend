import {
  Component,
  OnInit,
  ViewChild,
  inject,
  ChangeDetectorRef
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
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { FarmerService } from '../services/farmer.service';
import { AuctionRequestService } from '../services/auction-request.service';

import { CropResponseModel } from '../models/crop-response.model';
import { CropStatus } from '../models/crop-status.enum';

import { CropStatusPipe } from '../../../shared/pipes/crop-status-pipe';

import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { RequestAuctionDialog } from '../../../shared/components/request-auction-dialog/request-auction-dialog';

import { NotificationService } from '../../../core/services/notification.service';

import { APP_ROUTES } from '../../../core/constants/app-routes';

import { PageContainerComponent } from '../../../shared/ui/page-container/page-container';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { TableCard } from '../../../shared/ui/table-card/table-card';
import { SearchBarComponent } from '../../../shared/ui/search-bar/search-bar';
import { ActionButtonComponent } from '../../../shared/ui/action-button/action-button';
import { StatusChip } from '../../../shared/ui/status-chip/status-chip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-my-crops',
  standalone: true,
  imports: [
    CommonModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatButtonModule,
    MatIconModule,

    MatInputModule,
    MatFormFieldModule,

    MatDialogModule,

    CropStatusPipe,

    PageContainerComponent,
    PageHeader,
    TableCard,
    SearchBarComponent,
    ActionButtonComponent,
    StatusChip,
    MatTooltipModule,
    EmptyState
  ],
  templateUrl: './my-crops.html',
  styleUrl: './my-crops.scss'
})
export class MyCrops implements OnInit {

  private farmerService = inject(FarmerService);

  private auctionRequestService =
    inject(AuctionRequestService);

  private notificationService =
    inject(NotificationService);

  private dialog =
    inject(MatDialog);

  private router =
    inject(Router);

    private cdr =
  inject(ChangeDetectorRef);

  readonly CropStatus = CropStatus;

  displayedColumns = [
    'cropName',
    'category',
    'quantity',
    'expectedPrice',
    'status',
    'actions'
  ];

  dataSource =
    new MatTableDataSource<CropResponseModel>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadCrops();

  }

  loadCrops(): void {

    this.farmerService
      .getMyCrops()
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
            'Unable to load crops.'
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

  editCrop(id: number): void {

    this.router.navigate([
      APP_ROUTES.FARMER.EDIT_CROP,
      id
    ]);

  }

  goToAddCrop(): void {

    this.router.navigate([
      APP_ROUTES.FARMER.ADD_CROP
    ]);

  }

  deleteCrop(id: number): void {

    const dialogRef =
      this.dialog.open(
        ConfirmationDialog,
        {
          width: '400px',
          data: {
            message:
              'Are you sure you want to delete this crop?'
          }
        }
      );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.farmerService
        .deleteCrop(id)
        .subscribe({

          next: (response) => {

            this.notificationService.success(
              response.message
            );

            this.loadCrops();

          },

          error: (error) => {

            this.notificationService.error(
              error.error?.message ??
              'Unable to delete crop.'
            );

          }

        });

    });

  }

  requestAuction(crop: CropResponseModel): void {

    const dialogRef =
      this.dialog.open(
        RequestAuctionDialog,
        {
          width: '500px',
          data: {
            cropId: crop.id,
            cropName: crop.cropName
          }
        }
      );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.auctionRequestService
        .requestAuction(result)
        .subscribe({

          next: (response) => {

            this.notificationService.success(
              response.message
            );

            this.loadCrops();

          },

          error: (error) => {

            this.notificationService.error(
              error.error?.message ??
              'Unable to request auction.'
            );

          }

        });

    });

  }

}