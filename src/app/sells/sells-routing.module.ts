import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellsListComponent } from './sells-list/sells-list.component';

const routes: Routes = [
  {
    path: '',
    component: SellsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellsRoutingModule { }
