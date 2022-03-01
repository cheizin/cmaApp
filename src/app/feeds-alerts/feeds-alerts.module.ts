import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedsAlertsPageRoutingModule } from './feeds-alerts-routing.module';

import { FeedsAlertsPage } from './feeds-alerts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedsAlertsPageRoutingModule
  ],
  declarations: [FeedsAlertsPage]
})
export class FeedsAlertsPageModule {}
