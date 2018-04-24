import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './services/purchase.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Purchase } from './class/purchase';
import { PurchaseDetail } from './class/purchase-detail';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [PurchaseService]
})
export class PurchaseComponent implements OnInit {

  private purchase: Purchase;
  private openPurchases;
  private purchase_details: Observable<PurchaseDetail[]>;
  private purchase_detail: PurchaseDetail;

  private detailModalRef: NgbModalRef;

  private products;
  private presentations;

  constructor(private purchaseService: PurchaseService,
    private modalService: NgbModal) {
    this.purchase = new Purchase();
  }

  ngOnInit() {
    this.openPurchases = this.purchaseService.get_open_purchases();
    this.products = this.purchaseService.get_domain('PRODUCTO');
    this.presentations = this.purchaseService.get_domain('PRESENTACION');
  }

  open_modal(content, purchase: Purchase) {
    this.modalService.open(content, { size: 'lg' });
    this.purchase = purchase;
    this.get_details();
  }

  get_details() {
    this.purchase_details = this.purchaseService.get_details(this.purchase.id);
  }

  add(content, detail: PurchaseDetail) {
    this.detailModalRef = this.modalService.open(content, { size: 'sm' });
    this.purchase_detail = detail;
  }

  saveDetail() {
    this.purchase_detail.purchase_id = this.purchase.id;
    this.purchase_detail.total_cost = this.purchase_detail.unitary_cost * this.purchase_detail.amount;
    this.purchaseService.save_detail(this.purchase_detail).subscribe(res => {
      if (res.error === 0) {
        this.detailModalRef.close('Close click');
        this.get_details();
      } else {
        alert('Error');
      }
    });
  }
}
