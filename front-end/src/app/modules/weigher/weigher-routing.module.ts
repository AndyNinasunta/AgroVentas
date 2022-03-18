import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AttendTicketComponent } from './components/attend-ticket/attend-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'list-tickets',
    },
    {
        path: 'list-tickets',
        component: ListTicketsComponent,
    },
    {
        path: 'attend-ticket/:cod',
        component: AttendTicketComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WeigherRoutingModule {}
