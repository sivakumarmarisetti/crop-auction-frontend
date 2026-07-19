import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

import { AuctionModel } from '../models/auction.model';
import { AuctionSummaryModel } from '../../buyer/models/auction-summary.model';
import { CreateAuctionRequestModel } from '../models/create-auction-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}${API_ENDPOINTS.AUCTIONS}`;

  createAuction(
    request: CreateAuctionRequestModel
  ): Observable<AuctionModel> {

    return this.http.post<AuctionModel>(
      this.apiUrl,
      request
    );

  }

  getAllAuctions():
    Observable<AuctionSummaryModel[]> {

    return this.http.get<AuctionSummaryModel[]>(
      this.apiUrl
    );

  }

  getActiveAuctions():
    Observable<AuctionSummaryModel[]> {

    return this.http.get<AuctionSummaryModel[]>(
      `${this.apiUrl}/active`
    );

  }

  getAuction(
    auctionId: number
  ): Observable<AuctionModel> {

    return this.http.get<AuctionModel>(
      `${this.apiUrl}/${auctionId}`
    );

  }

  updateAuction(
    auctionId: number,
    request: CreateAuctionRequestModel
  ): Observable<AuctionModel> {

    return this.http.put<AuctionModel>(
      `${this.apiUrl}/${auctionId}`,
      request
    );

  }

  deleteAuction(
    auctionId: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${auctionId}`
    );

  }

}