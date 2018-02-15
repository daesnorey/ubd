import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleMenuComponent } from './components/module-menu/module-menu.component';
import { MenuService } from '../services/menu.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ModuleMenuComponent],
  providers: [],
  exports: [ModuleMenuComponent]
})
export class SharedModule {
  static forRoot() : ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MenuService]
    };
  }
}
