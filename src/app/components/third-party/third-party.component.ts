import { Component, OnInit } from '@angular/core';
import { ThirdParty } from './class/third-party';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.css']
})
export class ThirdPartyComponent implements OnInit {

  public third_party: ThirdParty;
  public editable = false;

  constructor() {
    this.third_party = new ThirdParty();
  }

  ngOnInit() {

  }

  public set_type(type: number) {
    this.third_party.third_type = type;
  }

}