import { Component, OnInit } from '@angular/core';
import { ThirdParty } from './class/third-party';
import { ThirdPartyService } from './services/third-party.service';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.css'],
  providers: [ThirdPartyService]
})
export class ThirdPartyComponent implements OnInit {

  public third_party: ThirdParty;
  public editable = false;
  public third_partys: ThirdParty[];
  public key;
  
  constructor(private thirdPartyService: ThirdPartyService) {
    this.third_party = new ThirdParty();
  }

  ngOnInit() {

  }

  public set_type(type: number) {
    this.third_party.third_type = type;
  }

  public find(search: string) {
    if(search == "ALL"){
      this.third_partys = this.thirdPartyService.get_third_party();
    }
    this.key = search;
  }

  public view(third: ThirdParty){
    this.third_party.third_type = third.third_type;
  }

}
