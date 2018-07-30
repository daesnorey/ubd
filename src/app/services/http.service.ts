import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { util } from '../class/util';
import { MatSnackBar } from '@angular/material';

export const WS_URL = '/frucun/api/';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private userKey = 'VWtkR2RXRlhWbk5OVkVsNg==';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'userKey': this.userKey
      }),
      params: {}
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private getHttpOptions(params?: any) {
    const tmpHttpOptions = this.httpOptions;
    if (params) {
      tmpHttpOptions.params = params;
    } else {
      delete tmpHttpOptions.params;
    }
    return tmpHttpOptions;
  }

  // public get<T>(url: string, params?: any): Observable<T>;

  public get(url: string, params?: any): Observable<any[]> {
    return this.http
    .get(url, this.getHttpOptions(params))
    .pipe(
      map(response => {
        const res = util.extract_response(response);
        if (res === false) {
          return [];
        } else if (res.code > 0) {
          this.snackBar.open(res.error);
          return [];
        } else {
          return (res.data as any[]);
        }
      }),
      tap(item => console.log(item, 'fetched')),
      catchError((err, caught) => {
        sessionStorage.setItem('lasterror', `${err} ${caught}`);
        console.error(err, caught);
        return [];
      })
    );
  }

  public post(url, body?: any): Observable<any> {
    return this.http
    .post(url, body, this.getHttpOptions())
    .pipe(
      map(response => {
        const res = util.extract_response(response);
        if (res === false) {
          return {};
        } else if (res.code > 0) {
          this.snackBar.open(res.error);
          return res;
        } else {
          const keys = Object.keys(res.data);
          if (keys.length > 0) {
            return {id: res.data[keys[0]]};
          }
          return {};
        }
      }),
      catchError((err, caught) => {
        sessionStorage.setItem('lasterror', `${err} ${caught}`);
        console.error(err, caught);
        return {} as any;
      })
    );
  }
}
