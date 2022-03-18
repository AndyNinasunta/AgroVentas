import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'new-ticket-tab',
        loadChildren: () =>
          import('../new-ticket-tab/new-ticket-tab.module').then(
            (m) => m.NewTicketTabPageModule
          ),
      },
      {
        path: 'list-tickets-tab',
        loadChildren: () =>
          import('../list-tickets-tab/list-tickets-tab.module').then(
            (m) => m.ListTicketsTabPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/new-ticket-tab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/new-ticket-tab',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
