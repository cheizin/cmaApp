import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketIntermediariesPage } from './market-intermediaries.page';

const routes: Routes = [
  {
    path: '',
    component: MarketIntermediariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketIntermediariesPageRoutingModule {}
