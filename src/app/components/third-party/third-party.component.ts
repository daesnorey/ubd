import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThirdParty } from './class/third-party';
import { ThirdPartyService } from './services/third-party.service';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/observable';
import { catchError, map, tap, takeWhile } from 'rxjs/operators';
import { Client } from './class/client';
import { Employee } from './class/employee';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.css'],
  providers: [ThirdPartyService]
})
export class ThirdPartyComponent implements OnInit, OnDestroy {

  public third_party: ThirdParty;
  public third_partys: ThirdParty[];
  public client: Client;
  public employee: Employee;

  public editThird = false;
  public editClient = false;
  public editEmployee = false;
  public loading = false;
  private alive = true;

  private page: number;

  private marital_status: any[] = null;
  private document_type: any[] = null;

  private subscription: Subscription = null;

  private thirdModalRef: NgbModalRef;

  public key;

  constructor(private thirdPartyService: ThirdPartyService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar,
    private menuService: MenuService) {
    this.third_party = new ThirdParty();
    this.client = new Client();
    this.employee = new Employee();
  }

  ngOnInit() {
    this.get_domain('ESTADO_CIVIL', false).subscribe(items => {
      this.marital_status = items;
    });
    this.get_domain('TIPO_DOCUMENTO', false).subscribe(items => {
      this.document_type = items;
    });
    // this.menuService.clear();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-bar-custom']
    });
  }

  public look_up(query?: string) {
    this.clean_search();
    if (!!query) {
      const advance = /[dna]{1}\s{0,3}:{1}/i;

      if (advance.test(query)) {
        const options = advance.exec(query);
        this.subscription = this.thirdPartyService
                                .advance_search(query, options)
                                .subscribe(result => this.third_partys = result);
      } else {
        this.subscription = this.thirdPartyService
                                .basic_search(query)
                                .subscribe(result => this.third_partys = result);
      }
    } else {
      this.subscription = this.thirdPartyService
                              .search_by_page(this.page)
                              .subscribe(result => this.third_partys = result);
    }
  }

  private clean_search(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  open_modal(content: any, selected_third?: ThirdParty) {
    this.thirdModalRef = this.modalService.open(content, { size: 'lg' });
    if (selected_third) {
      this.third_party = selected_third;
      this.editThird = false;
      this.get_client();
      this.get_employee();
    } else {
      this.third_party = new ThirdParty();
      this.editThird = true;
    }
  }

  get_domain(table: string, enc= true) {
    return this.thirdPartyService.get_domain(table, enc);
  }

  get_client() {
    this.thirdPartyService.get_third(this.third_party.id, 1)
      .toPromise()
      .then(res => {
        if (!!res.id) {
          this.client = new Client(
            res.id,
            res.third_id,
            res.factor,
            res.phone,
            res.address
          );
          this.editClient = false;
        } else {
          this.client = new Client();
          this.editClient = true;
        }
      }).catch(reason => {
        alert(reason);
      });
  }

  get_employee() {
    this.thirdPartyService.get_third(this.third_party.id, 2)
      .toPromise()
      .then(res => {
        if (!!res.id) {
          this.employee = new Employee(
            res.id,
            res.third_id,
            res.factor,
            res.phone,
            res.start_date,
            res.end_date
          );
          this.editEmployee = false;
        } else {
          this.employee = new Employee();
          this.editEmployee = true;
        }
      }).catch(reason => {
        alert(reason);
      });
  }

  save_third() {
    this.loading = true;
    this.thirdPartyService.save(this.third_party)
      .pipe(
        takeWhile(() => this.alive)
      )
      .toPromise()
      .then(res => {
        this.loading = false;
        if (res.error === 0) {
          if (!!res.id) {
            this.third_party.id = res.id;
            this.editThird = false;
          }
          this.openSnackBar('Tercero guardado', 'x');
        } else {
          alert('Error');
        }
      }).catch(reason => {
        alert(reason);
      });
  }

  save_client() {
    this.loading = true;
    this.client.third_id = this.third_party.id;
    this.thirdPartyService.save(this.client, 1)
      .pipe(
        takeWhile(() => this.alive)
      )
      .toPromise()
      .then(res => {
        this.loading = false;
        if (res.error === 0) {
          if (!!res.id) {
            this.client.id = res.id;
            this.editClient = false;
          }
          this.openSnackBar('Cliente guardado', 'x');
        } else {
          alert('Error');
        }
      }).catch(reason => {
        alert(reason);
      });
  }

  save_employee() {
    this.loading = true;
    this.employee.third_id = this.third_party.id;
    this.thirdPartyService.save(this.employee, 2)
      .pipe(
        takeWhile(() => this.alive)
      )
      .toPromise()
      .then(res => {
        this.loading = false;
        if (res.error === 0) {
          if (!!res.id) {
            this.employee.id = res.id;
            this.editEmployee = false;
          }
          this.openSnackBar('Empleado guardado', 'x');
        } else {
          alert('Error');
        }
      }).catch(reason => {
        alert(reason);
      });
  }

}
