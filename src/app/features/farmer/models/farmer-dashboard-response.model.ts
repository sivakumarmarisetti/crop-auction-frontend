export interface FarmerDashboardResponseModel {

  totalCrops: number;

  availableCrops: number;

  requestedCrops: number;

  soldCrops: number;

  pendingAuctionRequests: number;

  approvedAuctionRequests: number;

  recentCrops: CropResponseModel[];

}

export interface CropResponseModel {

  id: number;

  cropName: string;

  category: string;

  quantity: number;

  expectedPrice: number;

  harvestDate: string;

  description: string;

  status: string;

}