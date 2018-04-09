import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThirdParty } from '../class/third-party';

import 'rxjs/add/operator/map';

const WS_URL = '//localhost:2900/';
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

  public get_third_party(): ThirdParty[] {

    return [
      {
      id: 1,
      document_type: 'C',
      document_number: '1010189102',
      names: 'Laura',
      surnames: 'Corredor',
      third_type: 1,
      born_date: 19900203,
      marita_status: 'S',
      start_date: 20180405
    },
    {
      id: 2,
      document_type: 'C',
      document_number: '1013644408',
      names: 'Daniel',
      surnames: 'Novoa',
      third_type: 2,
      born_date: 19931030,
      marita_status: 'V',
      start_date: 20180405
    }];
  }

}
