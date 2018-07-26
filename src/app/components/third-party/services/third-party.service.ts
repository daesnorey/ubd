
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThirdParty } from '../class/third-party';

import { Observable } from 'rxjs/observable';

import { Employee } from '../class/employee';
import { Client } from '../class/client';

const WS_URL = '/frucun/api/';
const METHOD = 'third-party';

@Injectable()
export class ThirdPartyService {

  private userKey = 'VWtkR2RXRlhWbk5OVkVsNg==';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
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
    return this.http.get(apiUrl, this.httpOptions).pipe(
    map(res => {
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
    }));
  }

  public get_employee() {
    const apiUrl = `${WS_URL}${METHOD}-employee?timestamp=${Date.now()}`;
    return this.http.get(apiUrl, this.httpOptions).pipe(
    map(response => {
      let res = response as any;
      if (res === null || res === undefined) {
        return null;
      }
      if (res.code !== 0) {
        console.log(res);
        return null;
      } else {
        delete res.code;
        res = Object.keys(res).map(i => res[i]);
        return res.map(item => {
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
      }
    }));
  }

  private do_search(url) {
    return this.http.get(url, this.httpOptions).pipe(
    map(res => {
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
    }));
  }

  public get_domain(table: string, enc= true): Observable<any[]> {
    const apiUrl = `${WS_URL}domain?table=${table}&timestamp=${Date.now()}`;
    return this.http.get(apiUrl, this.httpOptions).pipe(
    map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      const result = (res as any[]).map(item => {
        if (enc) {
          return {id: btoa(item.id), name: item.name};
        } else {
          return {id: item.id, name: item.name};
        }
      });
      return result;
    }));
  }

  public get_third(id?: number, type=0) {
    if ( type === 0 ) {
      if ( id ){
        const apiUrl = `${WS_URL}${METHOD}?third_id=${id}`;
        return this.http.get<ThirdParty>(apiUrl, this.httpOptions);
      } else {
        const apiUrl = `${WS_URL}${METHOD}`;
        return this.do_search(apiUrl);
      }
    } else if ( type === 1 ) {
      const apiUrl = `${WS_URL}${METHOD}-client?third_id=${id}`;
      return this.http.get<any>(apiUrl, this.httpOptions);
    } else if ( type === 2 ) {
      const apiUrl = `${WS_URL}${METHOD}-employee?third_id=${id}`;
      return this.http.get<any>(apiUrl, this.httpOptions);
    }
  }

  public save(object, type= 0) {
    if ( type === 0 ) {
      const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
      return this.http.post<any>(apiUrl, object as ThirdParty, this.httpOptions);
    } else if (type === 1) {
      const apiUrl = `${WS_URL}${METHOD}-client?timestamp=${Date.now()}`;
      return this.http.post<any>(apiUrl, object as Client, this.httpOptions);
    } else if ( type === 2 ) {
      const apiUrl = `${WS_URL}${METHOD}-employee?timestamp=${Date.now()}`;
      return this.http.post<any>(apiUrl, object as Employee, this.httpOptions);
    }
  }

}
