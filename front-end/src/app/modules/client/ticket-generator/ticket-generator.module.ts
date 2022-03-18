import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketGeneratorRoutingModule } from './ticket-generator-routing.module';
import { NewGeneratorTicketComponent } from './pages/new-generator-ticket/new-generator-ticket.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    NewGeneratorTicketComponent,
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    TicketGeneratorRoutingModule,
    SharedModule
  ]
})
export class TicketGeneratorModule { }
