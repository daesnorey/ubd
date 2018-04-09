import { Component, OnInit } from '@angular/core';
import { ThirdParty } from './class/third-party';
import { ThirdPartyService } from './services/third-party.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.css'],
  providers: [ThirdPartyService]
})
export class ThirdPartyComponent implements OnInit {

  public third_party: ThirdParty;
  public editable = false;
  private page: number;

  private subscription: Subscription = null;

  public third_partys: ThirdParty[];
  public key;

  constructor(private thirdPartyService: ThirdPartyService) {
    this.third_party = new ThirdParty();
  }

  ngOnInit() {

  }

  public look_up(query?: string) {
    this.clean_search();
    if (!!query) {
      const advance = /[dna]{1}\s{0,3}:{1}/i;

      if (advance.test(query)) {
        const options = advance.exec(query);
        this.subscription = this.thirdPartyService
                                .advance_search(query, options)
                                .subscribe(result => this.third_partys = result);
      } else {
        this.subscription = this.thirdPartyService
                                .basic_search(query)
                                .subscribe(result => this.third_partys = result);
      }
    } else {
      this.subscription = this.thirdPartyService
                              .search_by_page(this.page)
                              .subscribe(result => this.third_partys = result);
    }
  }

  private clean_search(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  public view(third: ThirdParty) {
    this.third_party.third_type = third.third_type;
  }

}
