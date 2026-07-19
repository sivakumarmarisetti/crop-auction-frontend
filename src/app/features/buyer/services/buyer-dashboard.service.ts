import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ApiResponseModel } from '../../../core/models/api-response.model';

import { BuyerDashboardResponseModel } from '../models/buyer-dashboard-response.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerDashboardService {

  private http = inject(HttpClient);

  getDashboard():
    Observable<ApiResponseModel<BuyerDashboardResponseModel>> {

    return this.http.get<ApiResponseModel<BuyerDashboardResponseModel>>(
      `${environment.apiUrl}/dashboard/buyer`
    );

  }

}