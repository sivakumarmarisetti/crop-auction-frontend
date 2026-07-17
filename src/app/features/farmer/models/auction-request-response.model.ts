import { AuctionRequestStatus } from './auction-request-status.enum';

export interface AuctionRequestResponseModel {

  id: number;

  cropId: number;

  cropName: string;

  status: AuctionRequestStatus;

  farmerRemarks: string;

  adminComments: string;

  requestedAt: string;

  approvedAt: string | null;

}