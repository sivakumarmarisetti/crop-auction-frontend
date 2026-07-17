import { CropResponseModel } from './crop-response.model';

export interface FarmerDashboardResponseModel {

  totalCrops: number;

  availableCrops: number;

  requestedCrops: number;

  soldCrops: number;

  pendingAuctionRequests: number;

  approvedAuctionRequests: number;

  recentCrops: CropResponseModel[];

}