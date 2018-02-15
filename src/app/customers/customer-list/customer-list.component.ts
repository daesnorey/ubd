import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../../components/header/class/menu';
import { MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit() {
    let menu: Menu = {
      link: 'd',
      name: 'no'
    };
    this.menuService.addModuleMenu(menu);
  }

  ngOnDestroy() {
    this.menuService.setModuleMenu(null);
  }

}
