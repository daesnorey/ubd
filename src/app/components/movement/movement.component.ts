import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../header/class/menu';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit, OnDestroy {

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    const menu: Menu[] = [
      {
        link: '/movement/purchase',
        name: 'Compras'
      },
      {
        link: '/movement/inventory',
        name: 'Inventario'
      },
      {
        link: '/movement/production',
        name: 'Producción'
      }
    ];

    this.menuService.addModuleMenu(menu);
  }

  ngOnDestroy() {
    this.menuService.clear();
  }

}
