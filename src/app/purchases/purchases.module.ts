import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';

@NgModule({
  imports: [
    CommonModule,
    PurchasesRoutingModule
  ],
  declarations: [PurchasesListComponent]
})
export class PurchasesModule { }
