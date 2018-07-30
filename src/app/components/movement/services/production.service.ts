
import { map,  tap, catchError } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Production } from '../class/production';
import { ProductionDetail } from '../class/production-detail';
import { util } from '../../../class/util';
import { ProductionProcess } from '../class/production-process';
import { HttpService, WS_URL } from '../../../services/http.service';

const METHOD = 'production';
const INVENTORY_METHOD = 'inventory';
const PROCESS = 'process';

@Injectable()
export class ProductionService {

  constructor(private http: HttpService) { }

  public inventory_state: any[] = [];
  public presentations: Map<string, string> = new Map();
  public products: Map<string, string> = new Map();
  public process: Map<string, string> = new Map();

  public productsChanged = new EventEmitter();
  public presentationsChanged = new EventEmitter();
  public processChanged = new EventEmitter();

  public get_inventory_state(): Observable<any[]> {
    const apiUrl = `${WS_URL}domain?table=ESTADO_INVENTARIO&timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl)
    .pipe(
      map(res => {
        const result = res.map(item => {
          return {id: btoa(item.id), name: item.name};
        });
        this.inventory_state = result;
        return result;
      })
    );
  }

  public get_production_chart(filter: string): Observable<any[]> {
    const apiUrl = `${WS_URL}${METHOD}/chart?filter=${filter}&timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl)
    .pipe(
      map(res => {
        const result = res.map(item => {
          const data = [];
          for (let i = 1; i < Object.keys(item.data).length; i++) {
            data[i - 1] = item.data[i];
          }
          return {'label': item.label, 'data': data};
        });
        return result;
      })
    );
  }

  public get_production_process(production_process: any) {
    const apiUrl = `${WS_URL}${METHOD}/${PROCESS}?timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl, util.get_json(production_process))
    .pipe(
      map(res => {
        const result = res.map(item => {
          return new ProductionProcess(
            item.id,
            item.production_id,
            item.product_id,
            item.presentation_id,
            item.process_id,
            item.employee_id,
            item.quantity
          );
        });
        return result;
      })
    );
  }

  public get_process_presentation(process_presentation: any) {
    const apiUrl = `${WS_URL}process-presentation?timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl, util.get_json(process_presentation))
    .pipe(
      map(res => {
        return res;
      })
    );
  }

  public save_production(production: Production) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    return this.http.post(apiUrl, util.get_json(production));
  }

  public save_production_process(production_process: ProductionProcess) {
    const apiUrl = `${WS_URL}${METHOD}/${PROCESS}?timestamp=${Date.now()}`;
    return this.http.post(apiUrl, util.get_json(production_process));
  }

  public save_production_detail(production_detail: ProductionDetail) {
    const apiUrl = `${WS_URL}${METHOD}/detail?timestamp=${Date.now()}`;
    console.log(util.get_json(production_detail));
    return this.http.post(apiUrl, util.get_json(production_detail));
  }

  public get_production(production: any) {
    const apiUrl = `${WS_URL}${METHOD}?timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl, util.get_json(production))
    .pipe(
      map(res => {
        const result = res.map(item => {
          const _response = new Production(
            item.id,
            item.date,
            item.cost
          );
          return _response;
        });
        return result;
      })
    );
  }

  public get_production_detail(production_detail: any) {
    const apiUrl = `${WS_URL}${METHOD}/detail?timestamp=${Date.now()}`;
    return this.http
    .get(apiUrl, production_detail)
    .pipe(
      map(res => {
        const result = res.map(item => {
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
      })
    );
  }

  public get_inventory(inventory?: any) {
    const request = util.get_json(inventory || {});
    const apiUrl = `${WS_URL}${INVENTORY_METHOD}?timestamp=${Date.now()}`;
    return this.http.get(apiUrl, request);
  }

  public set_presentations(presentations) {
    this.presentations = presentations;
    this.presentationsChanged.emit(this.presentations);
  }

  public set_products(products) {
    this.products = products;
    this.productsChanged.emit(this.products);
  }

  public get_presentations() {
    return this.presentations;
  }

  public get_products() {
    return this.products;
  }

  public set_process(process) {
    this.process = process;
    this.processChanged.emit(this.process);
  }

  public get_process() {
    return this.process;
  }

}
