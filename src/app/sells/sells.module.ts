import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellsRoutingModule } from './sells-routing.module';
import { SellsListComponent } from './sells-list/sells-list.component';

@NgModule({
  imports: [
    CommonModule,
    SellsRoutingModule
  ],
  declarations: [SellsListComponent]
})
export class SellsModule { }
