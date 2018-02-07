import { Component, OnInit, Input } from '@angular/core';
import { Menu } from './class/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  type: number;

  menuList: Menu[] = [
    {
      name: "Customers",
      link: "/customers"
    },
    {
      name: "Inventory",
      link:"/inventory"
    },
    {
      name: "purchases",
      link:"/purchases"
    },
    {
      name: "sells",
      link:"/sells"
    },
    {
      name: "home",
      link: ""
    },
  ];

  moduleMenu: Menu[];

  constructor() { }

  ngOnInit() {
    console.log(this.type);
  }

}
