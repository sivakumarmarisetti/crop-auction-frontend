import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { AuctionService } from '../../auction/services/auction.service';
import { AuctionModel } from '../../auction/models/auction.model';

import { BidService } from '../../bid/services/bid.service';
import { BidHistoryModel } from '../../bid/models/bid-history.model';

import { WinnerService } from '../../winner/services/winner.service';
import { WinnerModel } from '../../winner/models/winner.model';

import { NotificationService } from '../../../core/services/notification.service';
import { WebsocketService } from '../../../core/services/websocket.service';

@Component({
  selector: 'app-crop-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './crop-details.html',
  styleUrl: './crop-details.scss'
})
export class CropDetails implements OnInit, OnDestroy {

  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private auctionService = inject(AuctionService);
  private bidService = inject(BidService);
  private winnerService = inject(WinnerService);
  private notificationService = inject(NotificationService);
  private websocketService = inject(WebsocketService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  auctionId = 0;

  auction?: AuctionModel;
  bids: BidHistoryModel[] = [];
  winner?: WinnerModel;

  form = this.fb.group({
    amount: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {

    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));

    this.refreshAll();

    this.websocketService.connect();

    this.websocketService.subscribe(this.auctionId, () => {

      this.zone.run(() => {

        setTimeout(() => {

          this.refreshAll();

        });

      });

    });

  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  private refreshAll(): void {

    this.loadAuction();
    this.loadBids();
    this.loadWinner();

  }

  loadAuction(): void {

    this.auctionService.getAuction(this.auctionId).subscribe({

      next: response => {

        this.auction = response;
        this.cdr.detectChanges();

      },

      error: error => {

        this.notificationService.error(
          error.error?.message ?? 'Unable to load auction.'
        );

      }

    });

  }

  loadBids(): void {

    this.bidService.getAuctionBidHistory(this.auctionId).subscribe({

      next: response => {

        this.bids = [...response];
        this.cdr.detectChanges();

      },

      error: error => {

        console.error(error);

      }

    });

  }

  loadWinner(): void {

    this.winnerService.getAuctionWinner(this.auctionId).subscribe({

      next: response => {

        this.winner = response;
        this.cdr.detectChanges();

      },

      error: error => {

        console.error(error);

      }

    });

  }

  placeBid(): void {

    if (this.form.invalid) {
      return;
    }

    this.bidService.placeBid(this.auctionId, {
      bidAmount: this.form.getRawValue().amount
    }).subscribe({

      next: () => {

        this.notificationService.success('Bid placed successfully.');

        this.form.reset({
          amount: 0
        });

        // DO NOT call refreshAll() here.
        // WebSocket will refresh every connected client.

      },

      error: error => {

        this.notificationService.error(
          error.error?.message ?? 'Unable to place bid.'
        );

      }

    });

  }

}