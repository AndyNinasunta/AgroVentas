import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTicketsTabPage } from './list-tickets-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ListTicketsTabPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTicketsTabPageRoutingModule {}
