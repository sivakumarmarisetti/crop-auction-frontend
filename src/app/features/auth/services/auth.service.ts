import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { StorageService } from '../../../core/services/storage.service';
import { ApiResponseModel } from '../../../core/models/api-response.model';

import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { FarmerRegisterRequestModel } from '../models/farmer-register-request.model';
import { BuyerRegisterRequestModel } from '../models/buyer-register-request.model';
import { CurrentUserModel } from '../models/current-user.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    `${environment.apiUrl}${API_ENDPOINTS.AUTH}`;

  private readonly currentUserSignal =
    signal<CurrentUserModel | null>(null);

  readonly currentUser = computed(() =>
    this.currentUserSignal()
  );

  readonly isLoggedIn = computed(() =>
    this.currentUserSignal() !== null
  );

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.restoreSession();
  }

  login(
    request: LoginRequestModel
  ): Observable<ApiResponseModel<LoginResponseModel>> {

    return this.http.post<ApiResponseModel<LoginResponseModel>>(
      `${this.apiUrl}/login`,
      request
    ).pipe(
      tap(response => {

        const data = response.data;

        this.storageService.saveToken(data.token);

        const currentUser: CurrentUserModel = {
          name: data.name,
          email: data.email,
          role: data.role
        };

        this.currentUserSignal.set(currentUser);

        this.storageService.saveUser(currentUser);

      })
    );

  }

  registerFarmer(
  request: FarmerRegisterRequestModel
): Observable<ApiResponseModel<void>> {

  return this.http.post<ApiResponseModel<void>>(
    `${this.apiUrl}/register/farmer`,
    request
  );

}

registerBuyer(
  request: BuyerRegisterRequestModel
): Observable<ApiResponseModel<void>> {

  return this.http.post<ApiResponseModel<void>>(
    `${this.apiUrl}/register/buyer`,
    request
  );

}

  logout(): void {

    this.storageService.clear();

    this.currentUserSignal.set(null);

  }

  getToken(): string | null {

    return this.storageService.getToken();

  }

  hasRole(role: Role): boolean {

    return this.currentUserSignal()?.role === role;

  }

  restoreSession(): void {

    const user = this.storageService.getUser();

    if (user) {
      this.currentUserSignal.set(user);
    }

  }

}