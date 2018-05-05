import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../header/class/menu';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit, OnDestroy {

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    const menu: Menu[] = [
      {
        link: '/production',
        name: 'Produccion'
      },
      {
        link: '/production/inventory',
        name: 'Inventario'
      }
    ];

    this.menuService.addModuleMenu(menu);
  }

  ngOnDestroy() {
    this.menuService.clear();
  }

}
