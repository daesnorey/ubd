import { Component, OnInit } from '@angular/core';
import { Client } from '../class/client';
import { ThirdPartyService } from '../services/third-party.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ThirdPartyService]
})
export class ClientComponent implements OnInit {

  public client: Client;
  public editable = false;

  constructor(private thirdPartyService: ThirdPartyService) {
    this.client = new Client();
  }

  ngOnInit() {
  }

}
