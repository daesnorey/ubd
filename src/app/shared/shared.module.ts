import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleMenuComponent } from './components/module-menu/module-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ModuleMenuComponent],
  providers: [],
  exports: [ModuleMenuComponent]
})
export class SharedModule { }
