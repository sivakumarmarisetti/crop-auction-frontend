import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ApiResponseModel } from '../../../core/models/api-response.model';

import { AuctionRequestRequestModel } from '../models/auction-request-request.model';
import { AuctionRequestResponseModel } from '../models/auction-request-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionRequestService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/api/auction-requests`;

  requestAuction(
    request: AuctionRequestRequestModel
  ): Observable<ApiResponseModel<AuctionRequestResponseModel>> {

    return this.http.post<ApiResponseModel<AuctionRequestResponseModel>>(
      this.apiUrl,
      request
    );

  }

  getMyRequests():
    Observable<ApiResponseModel<AuctionRequestResponseModel[]>> {

    return this.http.get<ApiResponseModel<AuctionRequestResponseModel[]>>(
      `${this.apiUrl}/my`
    );

  }

}