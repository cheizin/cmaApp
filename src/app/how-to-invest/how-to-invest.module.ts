import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowToInvestPageRoutingModule } from './how-to-invest-routing.module';

import { HowToInvestPage } from './how-to-invest.page';

import { MaterialModule } from '../material.module';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowToInvestPageRoutingModule,
    MaterialModule,
    SwiperModule
  ],
  declarations: [HowToInvestPage]
})
export class HowToInvestPageModule {}
