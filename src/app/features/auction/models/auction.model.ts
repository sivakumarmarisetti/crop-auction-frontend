export interface AuctionModel {

  auctionId: number;

  auctionCode: string;

  auctionRequestId: number;

  cropName: string;

  category: string;

  quantity: number;

  farmerName: string;

  startingPrice: number;

  currentHighestBid: number;

  highestBidder?: string;

  status: string;

  startTime: string;

  endTime: string;

}