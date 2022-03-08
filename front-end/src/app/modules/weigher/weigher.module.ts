import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { WeigherRoutingModule } from './weigher-routing.module';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AttendTicketComponent } from './components/attend-ticket/attend-ticket.component';
import { FormProductComponent } from './components/form-product/form-product.component';

@NgModule({
    declarations: [
    ListTicketsComponent,
    AttendTicketComponent,
    FormProductComponent
  ],
    imports: [CommonModule, SharedModule, WeigherRoutingModule],
})
export class WeigherModule {}
