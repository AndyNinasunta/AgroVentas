import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTicketTabPageRoutingModule } from './new-ticket-tab-routing.module';

import { NewTicketTabPage } from './new-ticket-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTicketTabPageRoutingModule,
  ],
  declarations: [NewTicketTabPage],
})
export class NewTicketTabPageModule {}
