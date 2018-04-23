import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase } from '../class/purchase';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

const WS_URL = '//localhost:2900/';
const METHOD = 'purchase';

@Injectable()
export class PurchaseService {

  private userKey = 'VWtkR2RXRlhWbk5OVkVsNg==';
  private httpOptions = {
      headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'userKey': this.userKey
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
                  item.cost,
                  item.state
                );
              });
              return results;
            });
  }

}
