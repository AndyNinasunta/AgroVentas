import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayProductRoutingModule } from './pay-product-routing.module';
import { ListPayProductComponent } from './pages/list-pay-product/list-pay-product.component';
import { PayProductComponent } from './components/pay-product/pay-product.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ListPayProductComponent,
    PayProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PayProductRoutingModule
  ]
})
export class PayProductModule { }
