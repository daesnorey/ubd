import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyComponent } from './components/third-party/third-party.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ProductionComponent } from './components/production/production.component';
import { ProductionViewComponent } from './components/production/production-view/production-view.component';
import { InventoryComponent } from './components/production/inventory/inventory.component';

const routes: Routes = [
  {
    path: 'third-party',
    component: ThirdPartyComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
  },
  {
    path: 'production',
    component: ProductionComponent,
    children: [
      {
        path: '',
        component: ProductionViewComponent

      },
      {
        path: 'inventory',
        component: InventoryComponent
      }
    ]
  },
  {
    path: 'production/:id',
    component: ProductionComponent,
    data: ['production']
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
