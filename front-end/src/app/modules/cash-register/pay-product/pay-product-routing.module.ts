import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ListPayProductComponent } from './pages/list-pay-product/list-pay-product.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list-pay-product',
  },
  {
    path: 'list-pay-product',
    component: ListPayProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayProductRoutingModule { }
