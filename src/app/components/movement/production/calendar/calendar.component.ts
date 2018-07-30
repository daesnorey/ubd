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
  isSameDay,
  isSameMonth,
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
import { ProductionService } from '../../services/production.service';
import { Production } from '../../class/production';
import { ProductionProcess } from '../../class/production-process';
import { ThirdPartyService } from '../../../third-party/services/third-party.service';
import { Employee } from '../../../third-party/class/employee';
import { takeWhile } from 'rxjs/operators';
import { ProductionDetail } from '../../class/production-detail';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  public view = 'month';
  public days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  public viewDate: Date = new Date();
  private modalRef: NgbModalRef;

  protected modalData: {
    action: string;
    event: CalendarEvent;
  };

  public loading = false;
  public refresh: Subject<any> = new Subject();

  public events: CalendarEvent[] = [];

  public activeDayIsOpen = false;

  public presentations_filtered: any[] = [];
  private production_processes: ProductionProcess[];
  public header: any;
  public productions: Production[] = [];
  public production: Production;
  public employees: Employee[];
  public products: any = {};
  private presentations: any = {};
  public process: any = {};
  private alive = true;
  public final_step = btoa('L');

  public formGroup: FormGroup;

  constructor(private modal: NgbModal,
    public productionService: ProductionService,
    private thirdPartyService: ThirdPartyService,
    private _formBuilder: FormBuilder) {}

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
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private set_presentations(presentations?: Map<string, string>) {
    if (!presentations) {
      presentations = this.productionService.get_presentations();
    }

    presentations
    .forEach((value, key) => {
      this.presentations[atob(key)] = value;
    });
  }

  private set_products(products?: Map<string, string>) {
    if (!products) {
      products = this.productionService.get_products();
    }

    products
    .forEach((value, key) => {
      this.products[atob(key)] = value;
    });
  }

  private set_process(process?: Map<string, string>) {
    if (!process) {
      process = this.productionService.get_process();
    }

    process
    .forEach((value, key) => {
      this.process[atob(key)] = value;
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
          this.production.date = date;
          this.formGroup = this.initProductionProcessGoup();
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

  public presentations_filter(event) {
    this.loading = true;
    this.presentations_filtered = [];
    const presentation_process = {process_id: this.formGroup.value.process_id};
    this.productionService
      .get_process_presentation(presentation_process)
      .pipe(takeWhile(() => this.alive))
      .subscribe(item => {
        item.forEach(next => {
          let presentation;
          this.productionService.get_presentations().forEach((value, key) => {
            const id = atob(key);
            if (parseInt(id, 10) === parseInt(next.presentation_id, 10)) {
              presentation = {id: key, name: value};
              this.presentations_filtered.push(presentation);
            }
          });
        });
        if (this.presentations_filtered.length === 1) {
          this.formGroup.controls.presentation_id.setValue(this.presentations_filtered[0].id);
        } else {
          this.presentations_filtered.unshift({id: -1, name: ''});
          this.formGroup.controls.presentation_id.setValue(-1);
        }
        this.loading = false;
      });
  }

  public add_production_process() {
    this.formGroup = this.initProductionProcessGoup({
      production_id: this.production.id
    });
  }

  private save_production(callback?: Function) {
    const subscribed = this.productionService.save_production(this.production)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res => {
      if (res.id) {
        this.production.id = res.id;
        if (callback) {
          callback();
        }
      }
      subscribed.unsubscribe();
      this.loading = false;
    });
  }

  public save_production_process() {
    if (this.formGroup.invalid) {
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
      const production_process = this.formGroup.value;
      production_process.production_id = this.production.id;
      const subscribed = this.productionService
        .save_production_process(production_process)
        .pipe(takeWhile(() => this.alive))
        .subscribe(res => {
          let index = -1;
          if (res.id) {
            production_process.id = res.id;
          } else {
            index = this.production_processes.findIndex((element, i) => element.id === production_process.id);
          }
          production_process.product_id = parseInt(atob(this.formGroup.controls.product_id.value), 10);
          production_process.presentation_id = parseInt(atob(this.formGroup.controls.presentation_id.value), 10);
          production_process.process_id = atob(this.formGroup.controls.process_id.value);
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

  public next_production_process(item) {
    this.formGroup.controls.prodcut_id.disable();
  }

  private clean_production_process() {
    this.formGroup = null;
    this.header = null;
    this.validate_forms_to_save(false);
    this.formGroup.controls.product_id.enable();
  }

  public end_production_process() {
    this.clean_production_process();
    if (this.production_processes && this.production_processes.length > 0) {
      this.set_process_header();
    } else {
      this.modalRef.close();
    }
  }

  private validate_forms_to_save(valida: boolean, key?: string) {
    if (key) {
      if (this.formGroup.controls[key]) {
        this.mark_as_touched(this.formGroup.controls[key], valida);
      }
    } else {
      const keys = Object.keys(this.formGroup.controls);
      for (const current of keys) {
        this.mark_as_touched(this.formGroup.controls[current], valida);
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

  confirm_production() {

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

  private initProductionProcessGoup(values?: any) {
    const formGroup = this._formBuilder.group({
      product_id: ['', Validators.required],
      process_id: ['', Validators.required],
      employee_id: ['', Validators.required],
      presentation_id: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    if (values && Object.keys(values).length > 0) {
      for (const key of Object.keys(values)) {
        formGroup.controls[key].setValue(values[key]);
      }
    }

    return formGroup;
  }
}
