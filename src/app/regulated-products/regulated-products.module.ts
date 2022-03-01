import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegulatedProductsPageRoutingModule } from './regulated-products-routing.module';

import { RegulatedProductsPage } from './regulated-products.page';

import { MaterialModule } from '../material.module';

import { SwiperModule } from 'swiper/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegulatedProductsPageRoutingModule,
    MaterialModule,
    SwiperModule,
  ],
  declarations: [RegulatedProductsPage]
})
export class RegulatedProductsPageModule {}
