import { Pipe, PipeTransform } from '@angular/core';
import { CropStatus } from '../../features/farmer/models/crop-status.enum';

@Pipe({
  name: 'cropStatus',
  standalone: true
})
export class CropStatusPipe implements PipeTransform {

  transform(status: CropStatus): string {

    switch(status){

      case CropStatus.AVAILABLE:
        return '🟢 Available';

      case CropStatus.AUCTION_REQUESTED:
        return '🟠 Auction Requested';

      case CropStatus.AUCTION_ASSIGNED:
        return '🔵 Auction Assigned';

      case CropStatus.SOLD:
        return '🟣 Sold';

      case CropStatus.UNSOLD:
        return '🔴 Unsold';

      default:
        return status;

    }

  }

}