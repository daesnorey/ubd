
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Purchase } from '../class/purchase';
import { PurchaseDetail } from '../class/purchase-detail';
import { Observable } from 'rxjs/observable';


const WS_URL = 'http://localhost:2900/';
const METHOD = 'purchase';

@Injectable()
export class PurchaseService {

  private userKey = 'VWtkR2RXRlhWbk5OVkVsNg==';
  private httpOptions = {
      headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Data-Type': 'json',
          'userKey': this.userKey,
          'method': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*'
      })
  };

  constructor(private http: HttpClient) { }

  public get_open_purchases(): Observable<Purchase[]> {
    const apiUrl = `${WS_URL}${METHOD}/open?timestamp=${Date.now()}`;
    return this.http.get(apiUrl).pipe(
      map(res => {
        if (res === null || res === undefined) {
          return null;
        }
        const results = (res as any[]).map( item => {
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
      }));
  }

  public get_details(id: number): Observable<PurchaseDetail[]> {
    const apiUrl = `${WS_URL}${METHOD}/detail?purchase_id=${id}&timestamp=${Date.now()}`;
    return this.http.get(apiUrl).pipe(
      map(res => {
        if (res === null || res === undefined) {
          return null;
        }
        const result = (res as any[]).map(item => {
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
    const apiUrl = `${WS_URL}${METHOD}/detail?timestamp=${Date.now()}`;
    return this.http.post<any>(apiUrl, purchase_detail);
  }

  public save_purchase(purchase: Purchase) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    return this.http.post<any>(apiUrl, purchase);
  }

  public close_purchase(purchase: Purchase) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    purchase.state = 1;
    return this.http.post<any>(apiUrl, purchase);
  }

}
