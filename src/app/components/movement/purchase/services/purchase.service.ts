
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase } from '../class/purchase';
import { PurchaseDetail } from '../class/purchase-detail';
import { Observable } from 'rxjs/observable';
import { util } from '../../../../class/util';
import { HttpService, WS_URL } from '../../../../services/http.service';


const METHOD = 'purchase';

@Injectable()
export class PurchaseService {

  constructor(private http: HttpService) { }

  public get_open_purchases(): Observable<Purchase[]> {
    const apiUrl = `${WS_URL}${METHOD}?state=0&timestamp=${Date.now()}`;
    return this.http.get(apiUrl)
    .pipe(
      map(res => {
        const results = res.map( item => {
          return new Purchase(
            item.id,
            item.third_party_id,
            item.date,
            item.sub_cost,
            item.total_cost,
            item.state
          );
        });
        return results;
      })
    );
  }

  public get_details(id: number): Observable<PurchaseDetail[]> {
    const apiUrl = `${WS_URL}${METHOD}-detail?purchase_id=${id}&timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl)
    .pipe(
      map(res => {
        const result = res.map(item => {
          return new PurchaseDetail(
            item.id,
            item.purchase_id,
            item.product_id,
            item.presentation_id,
            item.amount,
            item.unitary_cost,
            item.total_cost
          );
        });
        return result;
      }));
  }

  public save_detail(purchase_detail: PurchaseDetail) {
    const apiUrl = `${WS_URL}${METHOD}-detail?timestamp=${Date.now()}`;
    return this.http.post(apiUrl, purchase_detail);
  }

  public save_purchase(purchase: Purchase) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    return this.http.post(apiUrl, purchase);
  }

  public close_purchase(purchase: Purchase) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    purchase.state = 1;
    return this.http.post(apiUrl, purchase);
  }

}
