import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WeigherRoutingModule {}
