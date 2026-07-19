import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuctionService } from '../services/auction.service';

import { NotificationService } from '../../../core/services/notification.service';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-auction.html',
  styleUrl: './create-auction.scss'
})
export class CreateAuction {

  private fb = inject(NonNullableFormBuilder);

  private auctionService = inject(AuctionService);

  private notificationService =
    inject(NotificationService);

  private router =
    inject(Router);

  auctionForm = this.fb.group({

    auctionRequestId: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],
    startingPrice: [
  0,
  [
    Validators.required,
    Validators.min(0.01)
  ]
],

    startTime: [
      '',
      Validators.required
    ],

    endTime: [
      '',
      Validators.required
    ]

  });

  save(): void {

    if (this.auctionForm.invalid) {

      this.auctionForm.markAllAsTouched();

      return;

    }

    this.auctionService
      .createAuction(
        this.auctionForm.getRawValue()
      )
      .subscribe({

        next: (response) => {

          this.notificationService.success(
            'Auction created successfully.'
          );

          this.router.navigate([
            APP_ROUTES.ADMIN.AUCTIONS
          ]);

        },

        error: (error) => {

          this.notificationService.error(

            error.error?.message ??

            'Unable to create auction.'

          );

        }

      });

  }

  reset(): void {

    this.auctionForm.reset({
  auctionRequestId: 0,
  startingPrice: 0,
  startTime: '',
  endTime: ''
});

  }

}