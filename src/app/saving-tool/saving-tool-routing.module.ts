import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavingToolPage } from './saving-tool.page';

const routes: Routes = [
  {
    path: '',
    component: SavingToolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingToolPageRoutingModule {}
