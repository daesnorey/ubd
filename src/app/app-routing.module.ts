import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyComponent } from './components/third-party/third-party.component';
import { MovementComponent } from './components/movement/movement.component';
import { ProductionComponent } from './components/movement/production/production.component';
import { InventoryComponent } from './components/movement/inventory/inventory.component';
import { PurchaseComponent } from './components/movement/purchase/purchase.component';
import { QualityComponent } from './components/movement/purchase/quality/quality.component';
import { SalesComponent } from './components/sales/sales.component';
import { CalendarComponent } from './components/movement/production/calendar/calendar.component';
import { BillingComponent } from './components/sales/billing/billing.component';
import { PurchasingComponent } from './components/sales/purchasing/purchasing.component';
import { SalesIndicatorComponent } from './components/sales/sales-indicator/sales-indicator.component';

const routes: Routes = [
  {
    path: 'third-party',
    component: ThirdPartyComponent
  },
  {
    path: 'sales',
    component: SalesComponent,
    children: [
      {
        path: '',
        redirectTo: 'billing',
        pathMatch: 'full'
      },
      {
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'purchasing',
        component: PurchasingComponent
      },
      {
        path: 'indicators',
        component: SalesIndicatorComponent
      }
    ]
  },
  {
    path: 'movement',
    component: MovementComponent,
    children: [
      {
        path: '',
        redirectTo: 'production',
        pathMatch: 'full'
      },
      {
        path: 'production',
        component: ProductionComponent,
        children: [
          {
            path: '',
            component: CalendarComponent
          }
        ]
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'purchase',
        children: [
          {
            path: '',
            component: PurchaseComponent
          },
          {
            path: 'quality',
            component: QualityComponent
          }
        ]
      }
    ]
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
