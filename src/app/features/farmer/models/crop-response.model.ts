import { CropStatus } from './crop-status.enum';

export interface CropResponseModel {

  id: number;

  cropName: string;

  category: string;

  quantity: number;

  expectedPrice: number;

  harvestDate: string;

  description: string;

  status: CropStatus;

}