import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyComponent } from './components/third-party/third-party.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

const routes: Routes = [
  {
    path: 'third-party',
    component: ThirdPartyComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
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
