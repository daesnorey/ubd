import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductionService } from '../services/production.service';
import { ThirdPartyService } from '../../third-party/services/third-party.service';
import 'rxjs/add/operator/takeWhile';
import { Inventory } from '../class/inventory';
import { Production } from '../class/production';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [ProductionService, ThirdPartyService]
})
export class InventoryComponent implements OnInit, OnDestroy {

  private alive = true;
  private inventory: Inventory[];
  private items_to_expire: Inventory[];
  private presentations: {};
  private products: {};

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
    .takeWhile(() => this.alive)
    .subscribe(items => {
      for (const item of items) {
        this.presentations[item.id] = item.name;
      }
    }, error => {
      console.log(error);
    });
  }

  private get_products() {
    if (!this.products) {
      this.products = {};
    }
    this.thirdPartyService.get_domain('PRODUCTO', false)
      .takeWhile(() => this.alive)
      .subscribe(items => {
        for (const item of items) {
          this.products[item.id] = item.name;
        }
      }, error => {
        console.log(error);
      });
  }

  public get_inventory() {
    this.productionService.get_inventory()
      .takeWhile(() => this.alive)
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
    this.productionService.get_inventory(inventory)
      .takeWhile(() => this.alive)
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
