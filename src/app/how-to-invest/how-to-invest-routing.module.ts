import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToInvestPage } from './how-to-invest.page';

const routes: Routes = [
  {
    path: '',
    component: HowToInvestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToInvestPageRoutingModule {}
