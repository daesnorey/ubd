import { Component, OnInit } from '@angular/core';
import { Client } from '../class/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public client: Client;
  public editable = false;

  constructor() {
    this.client = new Client();
  }

  ngOnInit() {
  }

}
