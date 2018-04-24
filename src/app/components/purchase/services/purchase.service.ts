import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Purchase } from '../class/purchase';
import { PurchaseDetail } from '../class/purchase-detail';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

const WS_URL = 'http://api.frucun.com:2900/';
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
    const apiUrl = `${WS_URL}${METHOD}/open`;
    return this.http.get(apiUrl)
      .map(res => {
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
      });
  }

  public get_details(id: number): Observable<PurchaseDetail[]> {
    const apiUrl = `${WS_URL}${METHOD}/detail?purchase_id=${id}`;
    return this.http.get(apiUrl)
      .map(res => {
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
      });
  }

  public get_domain(table: string): Observable<any[]> {
    const apiUrl = `${WS_URL}domain?table=${table}`;
    return this.http.get(apiUrl)
    .map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      const result = (res as any[]).map(item => {
        return {id: btoa(item[0]), name: item[1]};
      });
      return result;
    });
  }

  public save_detail(purchase_detail: PurchaseDetail) {
    const apiUrl = `${WS_URL}${METHOD}/detail`;
    console.log(purchase_detail);
    return this.http.post<any>(apiUrl, purchase_detail);
  }

}
