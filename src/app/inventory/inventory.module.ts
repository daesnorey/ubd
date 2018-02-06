import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule
  ],
  declarations: [InventoryListComponent]
})
export class InventoryModule { }
