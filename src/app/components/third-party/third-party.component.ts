import { Component, OnInit } from '@angular/core';
import { ThirdParty } from './class/third-party';
import { ThirdPartyService } from './services/third-party.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/observable';
import { catchError, map, tap } from 'rxjs/operators';

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

  private marital_status: Observable<any[]>;

  private subscription: Subscription = null;

  public third_partys: ThirdParty[];
  public key;
  closeResult: string;

  constructor(private thirdPartyService: ThirdPartyService,
    private modalService: NgbModal) {
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

  open_modal(content: any, selected_third?: ThirdParty) {
    this.modalService.open(content, { size: 'lg' });
    this.third_party = selected_third;
    this.marital_status = this.get_domain('ESTADO_CIVIL');
  }

  get_domain(table: string) {
    return this.thirdPartyService.get_domain(table);
  }

  save(){
    this.thirdPartyService.save(this.third_party)
      .subscribe();
  }
  

}
