import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductionService } from '../services/production.service';
import { ThirdPartyService } from '../../third-party/services/third-party.service';

import { Inventory } from '../class/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [ProductionService, ThirdPartyService]
})
export class InventoryComponent implements OnInit, OnDestroy {

  private alive = true;
  public inventory: Inventory[];
  public items_to_expire: Inventory[];
  public presentations: {};
  public products: {};

  constructor(private productionService: ProductionService,
    private thirdPartyService: ThirdPartyService) { }

  ngOnInit() {
    this.get_products();
    this.get_presentations();
    this.get_inventory();
    this.get_items_to_expire();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private get_presentations() {
    if (!this.presentations) {
      this.presentations = {};
    }
    this.thirdPartyService.get_domain('PRESENTACION', false)
    .pipe(takeWhile(() => this.alive))
    .subscribe(items => {
      for (const [id, name] of items) {
        this.presentations[id] = name;
      }
    }, error => {
      console.log(error);
    });
  }

  private get_products() {
    if (!this.products) {
      this.products = {};
    }
    this.thirdPartyService.get_domain('PRODUCTO', false).pipe(
      takeWhile(() => this.alive))
      .subscribe(items => {
        for (const [id, name] of items) {
          this.products[id] = name;
        }
      }, error => {
        console.log(error);
      });
  }

  public get_inventory() {
    this.productionService.get_inventory().pipe(
      takeWhile(() => this.alive))
      .subscribe(res => {
        this.inventory = res;
      }, reason => {
        alert(reason);
        console.log(reason);
      });
  }

  public get_items_to_expire() {
    const inventory = new Inventory();
    inventory.expiration_date = new Date();
    inventory.expiration_date.setDate(inventory.expiration_date.getDate() + 25);
    this.productionService.get_inventory(inventory).pipe(
      takeWhile(() => this.alive))
      .subscribe(res => {
        this.items_to_expire = res.map(item => {
          return new Inventory(0, item.batch, item.presentation_id, item.product_id,
                                null, item.start_date, item.expiration_date, item.quantity, false);
        });
      }, reason => {
        alert(reason);
        console.log(reason);
      });
  }

}
