import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from '../header/class/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor(private menuService: MenuService,
    private router: Router) {

  }

  ngOnInit() {
  }

  do_action(event: Event) {
    this.clicked.emit(null);
  }

}
