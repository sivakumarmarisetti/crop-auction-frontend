import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  finalize,
  tap
} from 'rxjs';

import { environment } from '../../../../environments/environment';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

import { CropRequestModel } from '../models/crop-request.model';
import { CropResponseModel } from '../models/crop-response.model';

import { ApiResponseModel } from '../../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  private http = inject(HttpClient);

  readonly loading = signal(false);

  readonly crops = signal<CropResponseModel[]>([]);

  private apiUrl =
    `${environment.apiUrl}${API_ENDPOINTS.CROPS}`;

  getMyCrops(): Observable<ApiResponseModel<CropResponseModel[]>> {

    this.loading.set(true);

    return this.http
      .get<ApiResponseModel<CropResponseModel[]>>(
        `${this.apiUrl}/my`
      )
      .pipe(
        tap(response => this.crops.set(response.data)),
        finalize(() => this.loading.set(false))
      );

  }

  loadMyCrops(): void {

    this.getMyCrops().subscribe();

  }

  getCropById(
    id: number
  ): Observable<ApiResponseModel<CropResponseModel>> {

    return this.http.get<ApiResponseModel<CropResponseModel>>(
      `${this.apiUrl}/${id}`
    );

  }

  addCrop(
    request: CropRequestModel
  ): Observable<ApiResponseModel<CropResponseModel>> {

    return this.http.post<ApiResponseModel<CropResponseModel>>(
      this.apiUrl,
      request
    );

  }

  updateCrop(
    id: number,
    request: CropRequestModel
  ): Observable<ApiResponseModel<CropResponseModel>> {

    return this.http.put<ApiResponseModel<CropResponseModel>>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  deleteCrop(
    id: number
  ): Observable<ApiResponseModel<void>> {

    return this.http.delete<ApiResponseModel<void>>(
      `${this.apiUrl}/${id}`
    );

  }

}