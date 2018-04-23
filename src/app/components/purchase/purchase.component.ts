import { Component, OnInit } from '@angular/core';
import { Purchase } from './class/purchase';
import { PurchaseService } from './services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [PurchaseService]
})
export class PurchaseComponent implements OnInit {

  private purchase: Purchase;
  private openPurchases;

  constructor(private purchaseService: PurchaseService) {
    this.purchase = new Purchase();
  }

  ngOnInit() {
    this.openPurchases = this.purchaseService.get_open_purchases();
  }

}
