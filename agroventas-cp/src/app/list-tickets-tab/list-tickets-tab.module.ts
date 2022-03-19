import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTicketsTabPageRoutingModule } from './list-tickets-tab-routing.module';

import { ListTicketsTabPage } from './list-tickets-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTicketsTabPageRoutingModule,
  ],
  declarations: [ListTicketsTabPage],
})
export class ListTicketsTabPageModule {}
