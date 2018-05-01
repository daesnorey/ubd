import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Menu } from '../components/header/class/menu';

@Injectable()
export class MenuService {

  public moduleMenu: Menu[] = [];

  public constructor() {}

  public addModuleMenu(menu: Menu[]): void {
    this.moduleMenu = menu;
  }

  public clear() {
    this.moduleMenu = [];
  }

}
