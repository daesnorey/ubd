import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../../../header/class/menu';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit, OnDestroy {

  private oldMenu: Menu[];
  private menu: Menu[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menu = [
      {
        link: '/movement/purchase',
        name: 'Inicio'
      },
      {
        link: '/movement/purchase/quality',
        name: 'Calidad'
      }
    ];

    this.oldMenu = this.menuService.moduleMenu;
    this.menuService.addModuleMenu(this.menu);
  }

  ngOnDestroy() {
    this.menuService.addModuleMenu(this.oldMenu);
  }

}
