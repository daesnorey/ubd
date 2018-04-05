import { Component, OnInit, Input } from '@angular/core';
import { Menu } from './class/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  menuList: Menu[] = [
    {
      name: 'Terceros',
      link: '/third-party'
    }
  ];

  moduleMenu: Menu[];

  constructor(public menuService: MenuService) { }

  ngOnInit() {

  }

}
