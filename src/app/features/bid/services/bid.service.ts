import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

import { BidModel } from '../models/bid.model';
import { BidHistoryModel } from '../models/bid-history.model';
import { CreateBidRequestModel } from '../models/create-bid-request.model';
import { WinnerModel } from '../../winner/models/winner.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}${API_ENDPOINTS.BIDS}`;

  placeBid(
    auctionId: number,
    request: CreateBidRequestModel
  ): Observable<BidModel> {

    return this.http.post<BidModel>(
      `${this.apiUrl}/${auctionId}`,
      request
    );

  }

  getAuctionBidHistory(
    auctionId: number
  ): Observable<BidHistoryModel[]> {

    return this.http.get<BidHistoryModel[]>(
      `${this.apiUrl}/auction/${auctionId}`
    );

  }

  getBuyerBidHistory(
    buyerId: number
  ): Observable<BidHistoryModel[]> {

    return this.http.get<BidHistoryModel[]>(
      `${this.apiUrl}/buyer/${buyerId}`
    );

  }

  getAuctionWinner(
    auctionId: number
  ): Observable<WinnerModel> {

    return this.http.get<WinnerModel>(
      `${this.apiUrl}/winner/${auctionId}`
    );

  }

}