import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';

import { ConnectivityService } from './connectivity.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpRequestsInterceptor implements HttpInterceptor {

    constructor(private loader: LoaderService, private connectivity: ConnectivityService, private _snackBar: MatSnackBar) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
      this.loader.showLoader();

      //start check network
      this.connectivity.appIsOnline$.subscribe(online => {
        if (online) {
          //
        } else {
  
          this._snackBar.open(`Your Network is Offline`, 'Dismiss', {
            duration: 6000
          });
  
        }
  
      })
      //end check network

      return next.handle(req).pipe(
        finalize(() => {
          this.loader.hideLoader();
        })
      );
    };

}