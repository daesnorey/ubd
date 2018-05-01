import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../header/class/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private menuService: MenuService,
    private router: Router) {

    }

  ngOnInit() {

  }

  navigate(url: string) {
    this.router.navigateByUrl(`/${url}`);
  }

}
