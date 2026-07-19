import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

import { WinnerModel } from '../models/winner.model';

@Injectable({
  providedIn: 'root'
})
export class WinnerService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}${API_ENDPOINTS.BIDS}`;

  getAuctionWinner(
    auctionId: number
  ): Observable<WinnerModel> {

    return this.http.get<WinnerModel>(
      `${this.apiUrl}/winner/${auctionId}`
    );

  }

}