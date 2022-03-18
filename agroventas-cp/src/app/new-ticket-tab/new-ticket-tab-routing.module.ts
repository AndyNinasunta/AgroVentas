import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTicketTabPage } from './new-ticket-tab.page';

const routes: Routes = [
  {
    path: '',
    component: NewTicketTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTicketTabPageRoutingModule {}
