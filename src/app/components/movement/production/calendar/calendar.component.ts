import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isFuture,
  isPast
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { WeekDay, MonthViewDay } from 'calendar-utils';
import { ProductionService } from '../../services/production.service';
import { Production } from '../../class/production';
import { ProductionProcess } from '../../class/production-process';
import { ThirdPartyService } from '../../../third-party/services/third-party.service';
import { Employee } from '../../../third-party/class/employee';
import { takeWhile } from 'rxjs/operators';
import { MatStepper, MatStep, MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { ProductionDetail } from '../../class/production-detail';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  private view = 'month';
  private days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  private viewDate: Date = new Date();
  private modalRef: NgbModalRef;

  private modalData: {
    action: string;
    event: CalendarEvent;
  };

  private actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  private next = false;
  private loading = false;
  private refresh: Subject<any> = new Subject();

  private events: CalendarEvent[] = [];

  private activeDayIsOpen = false;

  private presentations_filtered: any[] = [];
  private production_processes: ProductionProcess[];
  private production_process: ProductionProcess;
  private header: any;
  private productions: Production[] = [];
  private production: Production;
  private employees: Employee[];
  private products: any = {};
  private presentations: any = {};
  private process: any = {};
  private alive = true;
  private final_step = btoa('L');

  private formGroups: FormGroup[] = [];

  constructor(private modal: NgbModal,
    private productionService: ProductionService,
    private thirdPartyService: ThirdPartyService,
    private _formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.set_presentations();
    this.set_products();
    this.set_process();
    this.set_employees();
    this.productionService
      .productsChanged
      .subscribe(products => {
        this.set_products(products);
    });
    this.productionService
      .presentationsChanged
      .subscribe(presentations => {
        this.set_presentations(presentations);
    });
    this.productionService
      .processChanged
      .subscribe(process => {
        this.set_process(process);
    });
    this.formGroups.push(this._formBuilder.group({
      productCtrl: ['', Validators.required],
      processCtrl: ['', Validators.required],
      employeeCtrl: ['', Validators.required],
      presentationCtrl: ['', Validators.required],
      quantityCtrl: ['', Validators.required],
      })
    );
  }

  ngOnDestroy() {
    this.alive = false;
    this.next = false;
  }

  private set_presentations(presentations?) {
    if (!presentations) {
      presentations = this.productionService.get_presentations();
    }

    presentations
    .forEach(item => {
      const key = atob(item.id);
      this.presentations[key] = item.name;
    });
  }

  private set_products(products?) {
    if (!products) {
      products = this.productionService.get_products();
    }

    products
    .forEach(item => {
      const key = atob(item.id);
      this.products[key] = item.name;
    });
  }

  private set_process(process?) {
    if (!process) {
      process = this.productionService.get_process();
    }

    process
    .forEach(item => {
      const key = atob(item.id);
      this.process[key] = item.name;
    });
  }

  private set_employees() {
    this.loading = true;
    this.thirdPartyService
      .get_employee()
      .pipe(takeWhile(() => this.alive))
      .subscribe(item => {
        this.employees = item;
        this.loading = false;
      });
  }

  private get_productions(date) {
    this.loading = true;
    const production = new Production();
    production.date = date;
    const subscribed = this.productionService
      .get_production(production)
      .pipe(takeWhile(() => this.alive))
      .subscribe(item => {
        this.productions = item;
        if (this.productions.length === 1) {
          this.production = this.productions[0];
          this.get_production_process();
        } else if (this.productions.length === 0) {
          this.production = new Production();
          this.production_process = new ProductionProcess();
        }
        subscribed.unsubscribe();
        this.loading = false;
      }, reason => {
        alert(reason);
        subscribed.unsubscribe();
        this.loading = false;
      });
  }

  private get_production_process() {
    this.loading = true;
    this.production_processes = [];
    const subscribed = this.productionService
      .get_production_process({production_id: this.production.id})
      .pipe(takeWhile(() => this.alive))
      .subscribe(item => {
        this.production_processes = item;
        this.set_process_header();
        subscribed.unsubscribe();
        this.loading = false;
      });
  }

  private set_process_header() {
    const header = {};

    this.production_processes
      .forEach(item => {
        if (!header[item.product_id]) {
          header[item.product_id] = {keys: []};
        }
        if (!header[item.product_id][item.process_id]) {
          const index = (header[item.product_id].keys as any[]).findIndex(key => key === item.process_id);
          if (index < 0) {
            header[item.product_id].keys.push(item.process_id);
          }
          header[item.product_id] [item.process_id] = item.quantity;
        } else {
          header[item.product_id][item.process_id] += item.quantity;
        }
    });

    this.header = header;
    this.header.keys = Object.keys(header);
  }

  private presentations_filter(event) {
    this.loading = true;
    this.presentations_filtered = [];
    const presentation_process = {process_id: this.production_process.process_id};
    this.productionService
      .get_process_presentation(presentation_process)
      .pipe(takeWhile(() => this.alive))
      .subscribe(item => {
        item.forEach(next => {
          const presentation = this.productionService.get_presentations()
            .find((current) =>  {
              const id = atob(current.id);
              return parseInt(id, 10) === next.presentation_id;
            });
          this.presentations_filtered.push(presentation);
        });
        if (this.presentations_filtered.length === 1) {
          this.production_process.presentation_id = this.presentations_filtered[0].id;
        }
        this.loading = false;
      });
  }

  private add_production_process() {
    this.production_process = new ProductionProcess();
    this.production_process.production_id = this.production.id;
  }

  private save_production(callback?: Function) {
    const subscribed = this.productionService.save_production(this.production)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res => {
      if (res.id) {
        this.production.id = res.id;
      }
      subscribed.unsubscribe();
      this.loading = false;
      if (callback) {
        callback();
      }
    });
  }

  private save_production_process() {
    if (this.formGroups[0].invalid) {
      this.validate_forms_to_save(true);
      return;
    }
    this.loading = true;
    if (!this.production.id) {
      this.production = new Production(undefined, this.viewDate, 0);
      this.save_production(this.save_production_process);
    } else {
      if (!this.production_processes) {
        this.production_processes = [];
      }
      this.production_process.production_id = this.production.id;
      const subscribed = this.productionService.save_production_process(this.production_process)
        .pipe(takeWhile(() => this.alive))
        .subscribe(res => {
          const production_process = this.production_process;
          let index = -1;
          if (res.id) {
            production_process.id = res.id;
            this.production_process.id = res.id;
          } else {
            index = this.production_processes.findIndex((element, i) => element.id === this.production_process.id);
          }
          production_process.product_id = parseInt(atob(this.production_process.product_id), 10);
          production_process.presentation_id = parseInt(atob(this.production_process.presentation_id.toString()), 10);
          production_process.process_id = atob(this.production_process.process_id);
          if (index >= 0) {
            this.production_processes[index] = production_process;
          } else {
            this.production_processes.push(production_process);
          }
          if (production_process.process_id === atob(this.final_step)) {
            this.generate_production_detail(production_process);
          }
          this.clean_production_process();
          this.set_process_header();
          subscribed.unsubscribe();
          this.loading = false;
        });
    }
  }

  private next_production_process(item) {
    // this.bottomSheet.open(OptionsBottomSheetComponent);
    this.next = true;
    this.production_process = new ProductionProcess();
    this.production_process.production_id = this.production.id;
    this.production_process.product_id = btoa(item);
    this.formGroups[0].controls.productCtrl.disable();
  }

  private clean_production_process() {
    this.production_process = null;
    this.header = null;
    this.validate_forms_to_save(false);
    this.formGroups[0].controls.productCtrl.enable();
    this.next = false;
  }

  private end_production_process() {
    this.clean_production_process();
    if (this.production_processes && this.production_processes.length > 0) {
      this.set_process_header();
    } else {
      this.modalRef.close();
    }
  }

  private validate_forms_to_save(valida: boolean, key?: string) {
    for (const formGroup of this.formGroups) {
      if (key) {
        if (formGroup.controls[key]) {
          this.mark_as_touched(formGroup.controls[key], valida);
        }
      } else {
        const keys = Object.keys(formGroup.controls);
        for (const current of keys) {
          this.mark_as_touched(formGroup.controls[current], valida);
        }
      }
    }
  }

  protected mark_as_touched(control: AbstractControl, mark: boolean) {
    if (mark) {
      control.markAsTouched();
    } else {
      control.markAsUntouched();
    }
  }

  private generate_production_detail(production_process: ProductionProcess) {
    const production_detail = new ProductionDetail();
    production_detail.production_id = production_process.production_id;
    production_detail.product_id = production_process.product_id;
    production_detail.presentation_id = production_process.presentation_id;
    production_detail.amount = production_process.quantity;
    production_detail.date = this.viewDate;
    production_detail.start_date = this.viewDate;
    const subscribed = this.productionService.save_production_detail(production_detail)
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        console.log(res);
        subscribed.unsubscribe();
      }, error => {
        console.log(error);
        subscribed.unsubscribe();
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isFuture(date)) {
      alert('Error, no puede ingresar datos a fechas futuras');
    } else if (!isSameDay(date, new Date()) && isPast(date)) {
      if (confirm('La fecha a modificar es anterior a la fecha actual, desea continuar?')) {
        this.start_production_process(date, events);
      }
    } else if (isSameMonth(date, this.viewDate)) {
      this.start_production_process(date, events);
    }
  }

  private start_production_process(date: Date, events?: CalendarEvent[]): void {
    this.production_processes = null;
    this.header = null;
    this.formGroups[0].controls.productCtrl.enable();
    this.viewDate = date;
    this.get_productions(date);
    this.modalRef = this.modal.open(this.modalContent, {
      size: 'lg',
      beforeDismiss: () =>  false
    });

    this.modalRef.result.then(result => {
      this.clean_production_process();
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    alert('Lol');
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      // color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}

@Component({
  selector: 'app-bottom-sheet',
  template: `
    <mat-nav-list>
      <a href="https://keep.google.com/" mat-list-item (click)="openLink($event)">
        <span mat-line>Google Keep</span>
        <span mat-line>Add to a note</span>
      </a>

      <a href="https://docs.google.com/" mat-list-item (click)="openLink($event)">
        <span mat-line>Google Docs</span>
        <span mat-line>Embed in a document</span>
      </a>

      <a href="https://plus.google.com/" mat-list-item (click)="openLink($event)">
        <span mat-line>Google Plus</span>
        <span mat-line>Share with your friends</span>
      </a>

      <a href="https://hangouts.google.com/" mat-list-item (click)="openLink($event)">
        <span mat-line>Google Hangouts</span>
        <span mat-line>Show to your coworkers</span>
      </a>
    </mat-nav-list>
  `,
})
export class OptionsBottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<OptionsBottomSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
