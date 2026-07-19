import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuctionSummaryModel } from '../models/auction-summary.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  private http = inject(HttpClient);

  private readonly auctionUrl =
    `${environment.apiUrl}/auctions`;

  getActiveAuctions(): Observable<AuctionSummaryModel[]> {

    return this.http.get<AuctionSummaryModel[]>(
      `${this.auctionUrl}/active`
    );

  }

}