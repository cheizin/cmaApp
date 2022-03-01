import { Injectable } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network, ConnectionStatus, NetworkStatus } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private handler: PluginListenerHandle;
  private status = new BehaviorSubject<ConnectionStatus>(null);
  
  constructor() { 
    this.handler = Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      this.sendStatusChangeMsg(status);
    });
  }

  public getStatusChangeMsg(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  private sendStatusChangeMsg(status: ConnectionStatus): void {
    this.status.next(status);
  }
}
