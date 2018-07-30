
import {takeWhile} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseService } from './services/purchase.service';
import { ThirdPartyService } from '../../third-party/services/third-party.service';
import { Purchase } from './class/purchase';
import { PurchaseDetail } from './class/purchase-detail';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { ThirdParty } from '../../third-party/class/third-party';
import { Menu } from '../../header/class/menu';
import { MenuService } from '../../../services/menu.service';
import { util } from '../../../class/util';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [PurchaseService, ThirdPartyService]
})
export class PurchaseComponent implements OnInit, OnDestroy {

  private thirdPartySubscription: Subscription;
  public thirdPartyList: ThirdParty[];
  public third: ThirdParty;

  public third_tmp: ThirdParty;
  public date: any;
  public purchase_loading = false;
  public detail_loading = false;

  public purchase: Purchase;
  public openPurchases: Purchase[] = null;
  public purchase_details: PurchaseDetail[];
  public purchase_detail: PurchaseDetail;

  private detailModalRef: NgbModalRef;
  private purchaseModalRef: NgbModalRef;

  public products: Map<string, string> = null;
  public presentations: Map<string, string> = null;

  private oldMenu: Menu[];

  private alive = true;

  constructor(private purchaseService: PurchaseService,
    private thirdPartyService: ThirdPartyService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar,
    private menuService: MenuService) {
    this.purchase = new Purchase();
  }

  ngOnInit() {
    const menu: Menu[] = [
      {
        link: '/movement/purchase',
        name: 'Inicio'
      },
      {
        link: '/movement/purchase/quality',
        name: 'Calidad'
      }
    ];

    this.oldMenu = this.menuService.moduleMenu;
    this.menuService.addModuleMenu(menu);

    this.get_open_purchases();
    this.thirdPartyService.get_domain('PRODUCTO').pipe(
    takeWhile(() => this.alive))
    .subscribe(items => {
      this.products = items;
    });

    this.thirdPartyService.get_domain('PRESENTACION').pipe(
    takeWhile(() => this.alive))
    .subscribe(items => {
      this.presentations = items;
    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.menuService.addModuleMenu(this.oldMenu);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-bar-custom']
    });
  }

  private get_open_purchases() {
    this.purchaseService.get_open_purchases().pipe(
      takeWhile(() => this.alive))
      .subscribe(res => {
        this.openPurchases = res;
      });
  }

  open_modal(content, purchase: Purchase) {
    this.purchase = purchase;
    this.third_tmp = null;
    this.date = null;
    if (!!this.purchase.id) {
      this.thirdPartyService.get_third(this.purchase.third_party_id).subscribe(response => {
        const res = util.extract_response(response);
        let item: any;
        if (res === false) {
          return null;
        } else if (res.code > 0) {
          return res;
        } else {
          item = res.data[0];
        }
        this.third = new ThirdParty(
          item.id,
          item.document_type,
          item.document_number,
          item.names,
          item.surnames,
          0,
          item.marital_status,
          item.start_date
        );
      });
      this.get_details();
    } else {
      this.purchase_details = [];
      this.purchase.sub_cost = 0;
      this.purchase.total_cost = 0;
    }
    this.purchaseModalRef = this.modalService.open(content, { size: 'lg' });
  }

  get_details() {
    this.purchaseService
    .get_details(this.purchase.id)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res => {
      this.purchase_details = res;
    });
  }

  add(content, detail: PurchaseDetail) {
    this.detailModalRef = this.modalService.open(content, { size: 'sm' });
    this.purchase_detail = detail;
  }

  saveDetail() {
    this.detail_loading = true;
    this.purchase_detail.purchase_id = this.purchase.id;
    this.purchase_detail.total_cost = this.purchase_detail.unitary_cost * this.purchase_detail.amount;
    this.purchaseService.save_detail(this.purchase_detail)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res => {
      this.detail_loading = false;
      if (res.code === 0) {
        if (!!res.id_detalle_compra) {
          this.purchase_detail.id = res.id_detalle_compra;
          this.purchase_details.push(this.purchase_detail as PurchaseDetail);
        }
        this.openSnackBar('Registro guardado', 'x');
        this.detailModalRef.close('Close click');
        this.update_purchase_total();
      } else {
        this.openSnackBar('Ha ocurrido un error al guardar', 'x');
      }
    });
  }

  private update_purchase_total() {
    let total = 0;
    this.purchase_details.forEach(item => {
      total += parseFloat(item.total_cost.toString());
    });

    if (total !== this.purchase.total_cost) {
      this.purchase.total_cost = this.purchase.sub_cost = total;
      this.save_purchase();
    }
  }

  confirm() {
    this.purchase_loading = true;
    this.purchaseService.close_purchase(this.purchase).pipe(
      takeWhile(() => this.alive))
      .subscribe(res => {
        this.purchase_loading = false;
        if (res.error === 0) {
          this.get_open_purchases();
          this.purchaseModalRef.close('Close click');
        } else {
          alert('Error');
        }
      });
  }

  public look_up(query?: string) {
    if (this.thirdPartySubscription) {
      this.thirdPartySubscription.unsubscribe();
    }
    if (!!query) {
      this.thirdPartySubscription = this.thirdPartyService
                                .basic_search(query)
                                .subscribe(result => {
                                  this.thirdPartyList = result;
                                });
    }
  }

  set_third(third: ThirdParty, search) {
    this.third_tmp = third;
    this.thirdPartyList = null;
  }

  save_purchase() {
    this.purchase_loading = true;
    if (!this.purchase.id) {
      this.purchase.third_party_id = this.third_tmp.id;
      this.purchase.state = 0;
      this.purchase.date = this.date;
    }
    this.purchaseService.save_purchase(this.purchase)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res => {
      this.purchase_loading = false;
      if (!!res.id_compra) {
        this.purchase.id = res.id_compra;
        this.third = this.third_tmp;
        this.third_tmp = null;
        this.openPurchases.push(this.purchase);
      }
      if (res.code === 0) {
        this.openSnackBar('Compra guardada', 'x');
      } else {
        this.openSnackBar('Ha ocurrido un error al guardar', 'x');
      }
    });
  }
}
