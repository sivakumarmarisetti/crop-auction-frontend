import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ApiResponseModel } from '../../../core/models/api-response.model';

import { UserResponseModel } from '../models/user-response.model';

import { AuctionRequestResponseModel } from '../../farmer/models/auction-request-response.model';

import { AdminDashboardResponseModel } from '../models/admin-dashboard-response.model';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

private readonly apiUrl =
  `${environment.apiUrl}${API_ENDPOINTS.ADMIN}`;

private readonly auctionRequestUrl =
  `${environment.apiUrl}${API_ENDPOINTS.AUCTION_REQUESTS}`;

  getDashboard():
  Observable<ApiResponseModel<AdminDashboardResponseModel>> {

  return this.http.get<ApiResponseModel<AdminDashboardResponseModel>>(
    `${this.apiUrl}/dashboard`
  );

}

  // ============================
  // USERS
  // ============================

  getPendingUsers(): Observable<ApiResponseModel<UserResponseModel[]>> {
    return this.http.get<ApiResponseModel<UserResponseModel[]>>(`${this.apiUrl}/users/pending`);
  }

  approveUser(userId: number): Observable<ApiResponseModel<void>> {
    return this.http.put<ApiResponseModel<void>>(`${this.apiUrl}/users/${userId}/approve`, {});
  }

  rejectUser(userId: number): Observable<ApiResponseModel<void>> {
    return this.http.put<ApiResponseModel<void>>(`${this.apiUrl}/users/${userId}/reject`, {});
  }

  // ============================
  // AUCTION REQUESTS
  // ============================

  getPendingAuctionRequests(): Observable<ApiResponseModel<AuctionRequestResponseModel[]>> {
    return this.http.get<ApiResponseModel<AuctionRequestResponseModel[]>>(
      `${this.auctionRequestUrl}/pending`,
    );
  }

  approveAuctionRequest(
    requestId: number,
    adminComments: string,
  ): Observable<ApiResponseModel<void>> {
    return this.http.put<ApiResponseModel<void>>(`${this.auctionRequestUrl}/${requestId}/approve`, {
      adminComments,
    });
  }

  rejectAuctionRequest(
    requestId: number,
    adminComments: string,
  ): Observable<ApiResponseModel<void>> {
    return this.http.put<ApiResponseModel<void>>(`${this.auctionRequestUrl}/${requestId}/reject`, {
      adminComments,
    });
  }
}
