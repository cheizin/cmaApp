import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestorEducationPage } from './investor-education.page';

const routes: Routes = [
  {
    path: '',
    component: InvestorEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorEducationPageRoutingModule {}
