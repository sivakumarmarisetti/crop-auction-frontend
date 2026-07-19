export interface AdminDashboardResponseModel {

  totalAuctions: number;

  scheduledAuctions: number;

  activeAuctions: number;

  completedAuctions: number;

  cancelledAuctions: number;

  totalFarmers: number;

  totalBuyers: number;

  totalCrops: number;

  totalRevenue: number;

  recentAuctions: RecentAuctionModel[];

  recentWinners: RecentWinnerModel[];

}

export interface RecentAuctionModel {

  auctionId: number;

  auctionCode: string;

  cropName: string;

  farmerName: string;

  startingPrice: number;

  currentHighestBid: number;

  status: string;

  startTime: string;

  endTime: string;

}

export interface RecentWinnerModel {

  auctionId: number;

  auctionCode: string;

  cropName: string;

  winnerName: string;

  winningBid: number;

}