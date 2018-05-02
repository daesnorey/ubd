import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductionService } from './services/production.service';
import { ThirdPartyService } from '../third-party/services/third-party.service';
import { ProductionDetail } from './class/production-detail';
import { Production } from './class/production';
import { Inventory } from './class/inventory';
import { Employee } from '../third-party/class/employee';
import { Chart, ChartConfiguration } from 'chart.js';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../header/class/menu';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css'],
  providers: [ProductionService, ThirdPartyService]
})
export class ProductionComponent implements OnInit {

  private inventory_states: any[];
  private production_detail: ProductionDetail;
  private production_details: ProductionDetail[];
  private production: Production;
  private productions: Production[];
  private inventory: Inventory;
  private date: Date;
  private total_cost: number;

  private employeeSubscription;
  private employeeList: Employee[];
  private employee: Employee;
  private employee_tmp: Employee;

  private detail_loading = false;
  private production_loading = false;
  private search: string;

  private products: any[] = null;
  private presentations: any[] = null;

  private main_modal: NgbModalRef;
  private detail_modal: NgbModalRef;

  private filter = 'day';
  private chart: Chart;
  private days_month: string[];
  private data_sets: any[];
  private chart_colors = ['#2e86c1', '#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#a04000',
                          '#117a65', '#ecf0f1', '#2e86c1', '#DAF7A6', '#FFC300', '#FF5733',
                          '#dc7633', '#873600', '#9c640c', '#af601a', '#a04000', '#117a65',
                          '#78281f', '#dc7633', '#873600', '#9c640c', '#af601a', '#a04000',
                          '#17202a', '#78281f', '#dc7633', '#873600', '#9c640c', '#af601a'];

  constructor(private productionService: ProductionService,
    private thirdPartyService: ThirdPartyService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar,
    private menuService: MenuService) {
      this.set_days_month();
  }

  ngOnInit() {
    const menu: Menu[] = [
      {
        link: '/production',
        name: 'Inicio'
      },
      {
        link: '/inventory',
        name: 'Inventario'
      }
    ];

    this.menuService.addModuleMenu(menu);
    this.chart_ini();
    this.productionService.get_inventory_state()
      .subscribe(res => {
        this.inventory_states = res;
      });
    this.thirdPartyService.get_domain('PRODUCTO').subscribe(items => {
        this.products = items;
      });
    this.thirdPartyService.get_domain('PRESENTACION').subscribe(items => {
        this.presentations = items;
      });
  }

  private chart_ini() {
    this.productionService.get_production_chart(this.filter)
      .subscribe(res => {
        this.data_sets = res;
        let cont = 0;
        this.data_sets.forEach(data => {
          data.backgroundColor = this.chart_colors[cont++];
        });
        this.do_chart();
      });
  }

  private init() {
    this.search = null;
    this.date = null;
    this.production = null;
    this.productions = null;
    this.employee = null;
    this.employee_tmp = null;
    this.date = null;
  }

  edit_production(show, production) {
    this.production = production;
    this.production_details = [];
    this.date = new Date();
    this.production.cost = 0;

    this.main_modal = this.modalService
        .open(show,
          {
            size: 'lg',
            beforeDismiss: () => {
              return !this.production_loading;
            }
          }
        );

    this.main_modal.result
        .then(result => {
          this.init();
          this.chart_ini();
        }, reason => {
          this.init();
          this.chart_ini();
        })
        .catch(reason => {
          console.log(reason, `catch Dismiss ${new Date}`);
        });
  }

  private do_chart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.days_month,
        datasets: this.data_sets
      },
      options: {
        title: {
          display: true,
          text: 'Producción mes'
        },
        legend: {
          position: 'right'
        }
      }
    });
  }

  private set_days_month() {
    const tmpDate = new Date();
    /**
     * Se comenta codigo para dejar solo los dias transcurridos del mes
     */
    // tmpDate.setDate(1);
    // tmpDate.setMonth(tmpDate.getMonth() + 1);
    // tmpDate.setDate(tmpDate.getDate() - 1);

    const day_number = tmpDate.getDate();
    let cont = 0;

    this.days_month = [...Array(day_number).fill(1, 0, day_number)].map(_ => (++cont).toString());
  }

  public find_employee(query?: string) {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
    if (!!query) {
      this.employeeSubscription = this.thirdPartyService
                                .searh_employee(query)
                                .subscribe(result => {
                                  this.employeeList = result;
                                });
    }
  }

  public set_item(item: Employee) {
    // this.router.navigate([`/production/emp/${item.id}`]);
    this.employee = item;
    this.search = `${item.names} ${item.surnames}`;
    this.employeeList = null;
    this.production_loading = true;
    const production = new Production();
    production.employee_id = this.employee.id;
    this.productionService.get_production(production)
        .toPromise()
        .then(res => {
          this.production_loading = false;
          this.productions = res;
        }).catch(reason => {
          alert(reason);
          console.error(reason);
          this.production_loading = false;
        });
  }

  add(show, detail) {
    this.detail_modal = this.modalService.open(show, {'size': 'lg'});
    this.total_cost = 0;
    this.production_detail = detail;
    this.production_detail.start_date = this.production.date;
    this.detail_date_changed();
  }

  save() {
    if (!this.production.id) {
      this.production_loading = true;
      this.production.employee_id = this.employee_tmp.id;
      this.production.date = this.date;
    }
    this.productionService.save_production(this.production)
        .toPromise()
        .then(res => {
          this.production_loading = false;
          if (!!res.id) {
            this.production.id = res.id;
            this.production.cost = 0;
            this.employee = this.employee_tmp;
            this.employee_tmp = null;
          }
          if (res.error !== 0) {
            alert(res.error);
          }
        })
        .catch(reason => {
          alert(reason);
          this.production_loading = false;
        });
  }

  save_detail() {
    this.detail_loading = true;
    this.production_detail.production_id = this.production.id;
    this.total_cost = this.production_detail.amount * this.production_detail.cost;

    this.productionService.save_production_detail(this.production_detail)
        .toPromise()
        .then(res => {
          this.detail_loading = false;
          if (res.error === 0) {
            this.production_detail.cost *= this.production_detail.amount;
            this.production_details.push(this.production_detail);
            if (!this.production.cost) {
              this.production.cost = 0;
            }
            this.production.cost += this.total_cost;
            this.save();
            this.detail_modal.close('Saved');
          } else {
            alert('Error al guardar');
          }
        })
        .catch(reason => {
          alert(reason);
          this.detail_loading = false;
        });
  }

  detail_date_changed() {
    this.production_detail.expiration_date = new Date(this.production_detail.start_date.getTime());
    this.production_detail.expiration_date.setMonth(this.production_detail.expiration_date.getMonth() + 3);
  }

  set_production(production: Production) {
    // this.router.navigate([`production/${production.id}`]);
    this.production_loading = true;
    this.production = production;
    this.production_detail = new ProductionDetail();
    this.production_detail.production_id = this.production.id;
    this.productionService.get_production_detail(this.production_detail)
        .toPromise()
        .then(res => {
          this.production_loading = false;
          this.production_details = res;
        })
        .catch(reason => {
          this.production_loading = false;
          console.error(reason);
        });
  }
}
