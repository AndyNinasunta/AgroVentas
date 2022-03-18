import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CreateBuyProductComponent } from './pages/create-buy-product/create-buy-product.component';
import { EditBuyProductComponent } from './pages/edit-buy-product/edit-buy-product.component';
import { ListBuyProductComponent } from './pages/list-buy-product/list-buy-product.component';


const routes: Route[] = [
    {
      path: '',
      redirectTo: 'list-buy-products',
    },
    {
      path: 'list-buy-products',
      component: ListBuyProductComponent
    },
    // {
    //   path: 'new-buy-product',
    //   component: CreateBuyProductComponent
    // },
    // {
    //   path: 'edit-buy-product/:id',
    //   component: EditBuyProductComponent
    // }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyProductRoutingModule { }

