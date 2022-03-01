import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedsPage } from './feeds.page';

import { FeedsAlertsPage } from '../feeds-alerts/feeds-alerts.page';

import { FeedsAlertsPageModule } from '../feeds-alerts/feeds-alerts.module';

const routes: Routes = [
  {
    path: '',
    component: FeedsPage
  },
  {
    path: 'feeds-alerts',
    loadChildren: () => import('../feeds-alerts/feeds-alerts.module').then( m => m.FeedsAlertsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedsPageRoutingModule {}
