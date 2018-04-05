import { Injectable } from '@angular/core';
import { Menu } from '../components/header/class/menu';

@Injectable()
export class MenuService {

  public moduleMenu: Menu[] = [];

  public constructor() { }

  public cleanModuleMenu(): void {
    this.moduleMenu = [];
  }

  public addModuleMenu(menu: Menu): void {
    if (this.moduleMenu === undefined || this.moduleMenu === null) {
      this.cleanModuleMenu();
    }

    this.moduleMenu.push(menu);
  }

  public setModuleMenu(menu: Menu[]): void {
    this.cleanModuleMenu();
    this.moduleMenu = menu;
  }

  public getModuleMenu(): Menu[] {
    return this.moduleMenu;
  }

}
