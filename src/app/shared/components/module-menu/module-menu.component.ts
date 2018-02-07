import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../components/header/class/menu';
import { Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-module-menu',
  templateUrl: './module-menu.component.html',
  styleUrls: ['./module-menu.component.css']
})
export class ModuleMenuComponent implements OnInit {

  @Input()
  title = "No voy a firmar";

  @Input()
  moduleMenu: Menu[] = [
    {
      name: 'prueba',
      link: '/laura'
    }
  ];

  path: string;

  constructor(private location: Location) { }

  ngOnInit() {
    this.path = this.location.path();
  }

}
