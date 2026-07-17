import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auctionRequestStatusColor',
  standalone: true
})
export class AuctionRequestStatusColorPipe implements PipeTransform {

  transform(status: string): string {

    switch (status) {

      case 'REQUESTED':
        return '#f9a825';

      case 'APPROVED':
        return '#2e7d32';

      case 'REJECTED':
        return '#c62828';

      case 'SCHEDULED':
        return '#1565c0';

      case 'COMPLETED':
        return '#6a1b9a';

      default:
        return '#616161';

    }

  }

}