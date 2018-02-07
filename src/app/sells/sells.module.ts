import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellsRoutingModule } from './sells-routing.module';
import { SellsListComponent } from './sells-list/sells-list.component';
import { SharedModule } from '../shared/shared.module';
import { SellsComponent } from './sells/sells.component';

@NgModule({
  imports: [
    CommonModule,
    SellsRoutingModule,
    SharedModule
  ],
  declarations: [SellsListComponent, SellsComponent],
  providers: [],
  bootstrap: [SellsComponent]
})
export class SellsModule { }
