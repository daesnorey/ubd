import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../header/class/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy {

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    const menu: Menu[] = [
      {
        link: '/sales/billing',
        name: 'Facturación'
      },
      {
        link: '/sales/purchasing',
        name: 'Orden Compra'
      },
      {
        link: '/sales/indicators',
        name: 'Indicadores'
      }
    ];

    this.menuService.addModuleMenu(menu);
  }

  ngOnDestroy() {
    this.menuService.clear();
  }

}
