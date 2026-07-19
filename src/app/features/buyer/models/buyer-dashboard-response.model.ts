export interface BuyerDashboardResponseModel {

  totalBids: number;

  auctionsParticipated: number;

  auctionsWon: number;

  activeBids: number;

  recentBids: RecentBidModel[];

}

export interface RecentBidModel {

  bidId: number;

  buyerName: string;

  bidAmount: number;

  bidTime: string;

}