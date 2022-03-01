import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestorEducationPageRoutingModule } from './investor-education-routing.module';

import { InvestorEducationPage } from './investor-education.page';

import { MaterialModule } from '../material.module';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestorEducationPageRoutingModule,
    MaterialModule,
    SwiperModule
  ],
  declarations: [InvestorEducationPage]
})
export class InvestorEducationPageModule {}
