import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThirdParty } from '../class/third-party';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { Employee } from '../class/employee';

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

  public searh_employee(query: string) {
    const apiUrl = `${WS_URL}${METHOD}/employee?search=1&q=${query}&timestamp=${Date.now()}`;
    return this.http.get(apiUrl)
    .map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      return (res as any[]).map(item => {
        return new Employee(
          item.id,
          item.third_id,
          item.factor,
          item.phone,
          item.start_date,
          item.end_date,
          item.document_type,
          item.document_number,
          item.names,
          item.surnames,
          item.born_date,
          item.marital_status
        );
      });
    });
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
          item.born_date,
          item.marital_status,
          item.start_date
        );
      });
    });
  }

  public get_domain(table: string): Observable<any[]> {
    const apiUrl = `${WS_URL}domain?table=${table}&timestamp=${Date.now()}`;
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

<<<<<<< HEAD
  public save(third: ThirdParty): Observable<ThirdParty>{
    const apiUrl = `${WS_URL}${METHOD}`;
    return this.http.post<ThirdParty>(apiUrl, third, this.httpOptions);

=======
  public get_third(id: number) {
    const apiUrl = `${WS_URL}${METHOD}?third_id=${id}`;
    return this.http.get<ThirdParty>(apiUrl);
>>>>>>> 39e53fbf7b1593f681279d858b9eac83009fcb79
  }
}
