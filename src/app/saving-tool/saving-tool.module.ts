import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingToolPageRoutingModule } from './saving-tool-routing.module';

import { SavingToolPage } from './saving-tool.page';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavingToolPageRoutingModule,
    MaterialModule,
  ],
  declarations: [SavingToolPage]
})
export class SavingToolPageModule {}
