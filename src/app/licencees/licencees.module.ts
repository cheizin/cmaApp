import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenceesPageRoutingModule } from './licencees-routing.module';

import { LicenceesPage } from './licencees.page';

import { MaterialModule } from '../material.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenceesPageRoutingModule,
    MaterialModule,
    Ng2SearchPipeModule,
  ],
  declarations: [LicenceesPage]
})
export class LicenceesPageModule {}
