import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyComponent } from './components/third-party/third-party.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ProductionComponent } from './components/production/production.component';

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
        path: 'emp',
        data: ['emp'],
        children: [
          {
            path: ':id',
            component: ProductionComponent
          }
        ]
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
