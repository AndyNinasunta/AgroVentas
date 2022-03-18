import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyProductRoutingModule } from './buy-product-routing.module';
import { ListBuyProductComponent } from './pages/list-buy-product/list-buy-product.component';
import { CreateBuyProductComponent } from './pages/create-buy-product/create-buy-product.component';
import { EditBuyProductComponent } from './pages/edit-buy-product/edit-buy-product.component';
import { FormBuyProductComponent } from './components/form-buy-product/form-buy-product.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ListBuyProductComponent,
    CreateBuyProductComponent,
    EditBuyProductComponent,
    FormBuyProductComponent
  ],
  imports: [
    CommonModule,
    BuyProductRoutingModule,
    SharedModule,
  ]
})
export class BuyProductModule { }
