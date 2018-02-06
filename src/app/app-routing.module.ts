import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: 'app/customers/customers.module#CustomersModule'
  },
  {
    path: 'inventory',
    loadChildren: 'app/inventory/inventory.module#InventoryModule'
  },
  {
    path: 'purchases',
    loadChildren: 'app/purchases/purchases.module#PurchasesModule'
  },
  {
    path: 'sells',
    loadChildren: 'app/sells/sells.module#SellsModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
