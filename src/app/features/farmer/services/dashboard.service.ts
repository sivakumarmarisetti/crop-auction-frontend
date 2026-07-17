import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ApiResponseModel } from '../../../core/models/api-response.model';

import { FarmerDashboardResponseModel } from '../models/farmer-dashboard-response.model';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/dashboard/farmer`;

  getDashboard():
    Observable<ApiResponseModel<FarmerDashboardResponseModel>> {

    return this.http.get<
      ApiResponseModel<FarmerDashboardResponseModel>
    >(this.apiUrl);

  }

}