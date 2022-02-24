import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { NewGeneratorTicketComponent } from './pages/new-generator-ticket/new-generator-ticket.component';


const routes: Route[] = [
    {
      path: '',
      redirectTo: 'new-ticket',
    },
    {
      path: 'new-ticket',
      component: NewGeneratorTicketComponent
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketGeneratorRoutingModule { }
