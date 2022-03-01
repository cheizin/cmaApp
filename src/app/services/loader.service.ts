
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { concatMap, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingRequestsStream$: Subject<boolean>;
  private loaderElement: HTMLIonLoadingElement;
  private lazyDismissTimer: NodeJS.Timeout;

  constructor(private loadingCtrl: LoadingController) {
    this.initValues();
  };

  private initValues() {
    this.loaderElement = null;
    this.lazyDismissTimer = null;
    this.loadingRequestsStream$ = new Subject();
    this.loadingRequestsStream$.pipe(
      distinctUntilChanged(),
      concatMap(loader =>{
        if (loader) {
          return this.createLoader()
        } else {
          return this.dismissLoader()
        };
      })
    )
    .subscribe(); // we do not worry of unsubscribing here since this service will always be used across the app
  };

  public showLoader() {
    this.loadingRequestsStream$.next(true);
  };

  public hideLoader() {
    this.loadingRequestsStream$.next(false);
  };

  private async createLoader():Promise<void> {
    // we check if there is a loader already instantiated:
    if (!this.loaderElement) {
      // if not we create new loader and limit its max duration to 2000ms to prevent blocking loader to hangout indefinitely
      this.loaderElement = await this.loadingCtrl.create({
        //message: '<ion-img src="/assets/loader.gif" alt="Serving You..."></ion-img>',
        message: null,
        spinner: 'dots',
        duration: 2000,
        backdropDismiss:true,
        cssClass:'loader-css-class',
      });
      // its essential we return a Promise here as this is what concatMap will leverage for serialization
      return this.loaderElement.present();
    } else {
      // if loader element exists already we just return resolved promise:
      return Promise.resolve();
    };
  };

  private async dismissLoader(): Promise<void> {
    // here we check if loader element exists and that there is no timer running already
    if (this.loaderElement && !this.lazyDismissTimer) {
      // we set the timer
      this.lazyDismissTimer = setTimeout(async () => {
        // after 700ms we dismiss our loader element:
        await this.loaderElement.dismiss();
        // nullify our properties right after dismiss promise fulfilled itself:
        this.loaderElement = null;
        clearTimeout(this.lazyDismissTimer);
        this.lazyDismissTimer = null;
        // still remember to return a promise to let concatMap know it can proceed
        return Promise.resolve();
      }, 700)
    } else {
      // if loader element does not exist or if there is already a timer running - there is nothing to dismiss, we just return empty promise
      return Promise.resolve();
    };
  };

}
