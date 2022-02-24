import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { WeigherRoutingModule } from './weigher-routing.module';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';

@NgModule({
    declarations: [
    ListTicketsComponent
  ],
    imports: [CommonModule, SharedModule, WeigherRoutingModule],
})
export class WeigherModule {}