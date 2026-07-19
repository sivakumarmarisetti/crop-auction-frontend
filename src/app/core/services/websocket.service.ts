import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;

  connect(): void {

    if (this.client?.active) {
      return;
    }

    this.client = new Client({

      brokerURL: 'ws://localhost:8080/ws-auction',

      reconnectDelay: 5000,

      debug: (message: string) => {
        console.log(message);
      }

    });

    this.client.activate();

  }

  subscribe(
    auctionId: number,
    callback: (message: any) => void
  ): void {

    if (!this.client) {
      return;
    }

    if (this.client.connected) {

      this.client.subscribe(
        `/topic/auction/${auctionId}`,
        (message: IMessage) => {
          callback(JSON.parse(message.body));
        }
      );

      return;

    }

    this.client.onConnect = () => {

      this.client.subscribe(
        `/topic/auction/${auctionId}`,
        (message: IMessage) => {
          callback(JSON.parse(message.body));
        }
      );

    };

  }

  disconnect(): void {

    if (this.client?.active) {
      this.client.deactivate();
    }

  }

}