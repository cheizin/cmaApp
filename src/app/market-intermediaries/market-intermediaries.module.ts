import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketIntermediariesPageRoutingModule } from './market-intermediaries-routing.module';

import { MarketIntermediariesPage } from './market-intermediaries.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketIntermediariesPageRoutingModule,
    MaterialModule
  ],
  declarations: [MarketIntermediariesPage]
})
export class MarketIntermediariesPageModule {}
