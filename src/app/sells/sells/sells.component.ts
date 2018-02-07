import { Component, OnInit } from '@angular/core';
import { Menu } from '../../components/header/class/menu';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.css']
})
export class SellsComponent implements OnInit {

  title = "Sells";

  menu: Menu[] = [
    {
      link: 'sells/list',
      name: 'Lista'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
