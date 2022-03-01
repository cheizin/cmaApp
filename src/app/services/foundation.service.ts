import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FoundationProvider {

  constructor(
    public loader: LoaderService,
    public router: Router
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loader.showLoader();
      } else if (event instanceof NavigationEnd) {
        this.loader.hideLoader();
      };
    });
  }

}