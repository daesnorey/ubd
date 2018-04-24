import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThirdParty } from '../class/third-party';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

const WS_URL = 'http://localhost:2900/';
const METHOD = 'third-party';

@Injectable()
export class ThirdPartyService {

  private userKey = 'VWtkR2RXRlhWbk5OVkVsNg==';
  private httpOptions = {
      headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'userKey': this.userKey
      })
  };

  constructor(private http: HttpClient) { }

  public basic_search(query: string) {
    const apiUrl = `${WS_URL}${METHOD}?q=${query}&op=1`;
    return this.do_search(apiUrl);
  }

  public advance_search(query: string, options: RegExpExecArray) {
    const apiUrl = `${WS_URL}${METHOD}?q=${query}&op=2`;
    return this.do_search(apiUrl);
  }

  public search_by_page(page: number) {
    const apiUrl = `${WS_URL}${METHOD}?page=${page}`;
    return this.do_search(apiUrl);
  }

  private do_search(url) {
    return this.http.get(url)
    .map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      return (res as any[]).map(item => {
        return new ThirdParty (
          item.id,
          item.document_type,
          item.document_number,
          item.names,
          item.surnames,
          item.third_type,
          item.born_date,
          item.marita_status,
          item.start_date
        );
      });
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
        return {id: item[0], name: item[1]};
      });
      return result;
    });
  }
}
