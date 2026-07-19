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
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  // Used only for admin APIs like users
  private readonly apiUrl =
    `${environment.apiUrl}${API_ENDPOINTS.ADMIN}`;

  getDashboard():
    Observable<ApiResponseModel<AdminDashboardResponseModel>> {

    return this.http.get<ApiResponseModel<AdminDashboardResponseModel>>(
      `${environment.apiUrl}/dashboard/admin`
    );

  }

  // ============================
  // USERS
  // ============================

  getPendingUsers():
    Observable<ApiResponseModel<UserResponseModel[]>> {

    return this.http.get<ApiResponseModel<UserResponseModel[]>>(
      `${this.apiUrl}/users/pending`
    );

  }

  approveUser(userId: number):
    Observable<ApiResponseModel<void>> {

    return this.http.put<ApiResponseModel<void>>(
      `${this.apiUrl}/users/${userId}/approve`,
      {}
    );

  }

  rejectUser(userId: number):
    Observable<ApiResponseModel<void>> {

    return this.http.put<ApiResponseModel<void>>(
      `${this.apiUrl}/users/${userId}/reject`,
      {}
    );

  }

  // ============================
  // AUCTION REQUESTS
  // ============================

  getPendingAuctionRequests():
    Observable<ApiResponseModel<AuctionRequestResponseModel[]>> {

    return this.http.get<ApiResponseModel<AuctionRequestResponseModel[]>>(
      `${environment.apiUrl}/auction-requests/pending`
    );

  }

  approveAuctionRequest(
    requestId: number,
    adminComments: string
  ): Observable<ApiResponseModel<void>> {

    return this.http.put<ApiResponseModel<void>>(
      `${environment.apiUrl}/auction-requests/${requestId}/approve`,
      {
        adminComments
      }
    );

  }

  rejectAuctionRequest(
    requestId: number,
    adminComments: string
  ): Observable<ApiResponseModel<void>> {

    return this.http.put<ApiResponseModel<void>>(
      `${environment.apiUrl}/auction-requests/${requestId}/reject`,
      {
        adminComments
      }
    );

  }

}