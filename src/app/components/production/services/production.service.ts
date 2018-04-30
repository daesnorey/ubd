import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { Production } from '../class/production';
import { ProductionDetail } from '../class/production-detail';

const WS_URL = 'http://api.frucun.com:2900/';
const METHOD = 'production';

@Injectable()
export class ProductionService {

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

  public get_inventory_state(): Observable<any[]> {
    const apiUrl = `${WS_URL}domain?table=ESTADO_INVENTARIO&timestamp=${Date.now()}`;
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

  public get_production_chart(filter: string): Observable<any[]> {
    const apiUrl = `${WS_URL}${METHOD}/chart?filter=${filter}&timestamp=${Date.now()}`;
    return this.http.get(apiUrl)
    .map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      const result = (res as any[]).map(item => {
        const data = [];
        for (let i = 1; i < Object.keys(item.data).length; i++) {
          data[i - 1] = item.data[i];
        }
        return {'label': item.label, 'data': data};
      });
      return result;
    });
  }

  public save_production(production: Production) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    return this.http.post<any>(apiUrl, production);
  }

  public save_production_detail(production_detail: ProductionDetail) {
    const apiUrl = `${WS_URL}${METHOD}/detail?timestamp=${Date.now()}`;
    return this.http.post<any>(apiUrl, production_detail);
  }

  public get_production(production: any) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    return this.http.get(apiUrl, {
      params: production
    })
    .map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      const result = (res as any[]).map(item => {
        const response = new Production(
          item.id,
          item.employee_id,
          item.date,
          item.cost
        );
        return response;
      });
      return result;
    });
  }

  get_production_detail(production_detail: any) {
    const apiUrl = `${WS_URL}${METHOD}/detail?timestamp=${Date.now()}`;
    return this.http.get(apiUrl, {
      params: production_detail
    })
    .map(res => {
      if (res === null || res === undefined) {
        return null;
      }
      const result = (res as any[]).map(item => {
        const response = new ProductionDetail(
          item.id,
          item.production_id,
          item.inventory_id,
          item.cost,
          item.amount,
          item.date,
          item.batch,
          item.presentation_id,
          item.product_id,
          item.inventory_state_id,
          item.start_date,
          item.expiration_date
        );
        return response;
      });
      return result;
    });
  }

}
