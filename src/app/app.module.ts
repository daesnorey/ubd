import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuService } from './services/menu.service';
import { ThirdPartyComponent } from './components/third-party/third-party.component';
import { ClientComponent } from './components/third-party/client/client.component';
import { EmployeeComponent } from './components/third-party/employee/employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import {
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatExpansionModule,
  MatStepperModule,
  MatCardModule,
  MatBottomSheetModule,
  MatTabsModule
} from '@angular/material';
import { MovementComponent } from './components/movement/movement.component';
import { MenuComponent } from './components/menu/menu.component';
import { InventoryComponent } from './components/movement/inventory/inventory.component';
import { ProductionComponent } from './components/movement/production/production.component';
import { PurchaseComponent } from './components/movement/purchase/purchase.component';
import { QualityComponent } from './components/movement/purchase/quality/quality.component';
import { SalesComponent } from './components/sales/sales.component';
import { CalendarComponent, OptionsBottomSheetComponent } from './components/movement/production/calendar/calendar.component';
import { BillingComponent } from './components/sales/billing/billing.component';
import { PurchasingComponent } from './components/sales/purchasing/purchasing.component';
import { SalesIndicatorComponent } from './components/sales/sales-indicator/sales-indicator.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThirdPartyComponent,
    ClientComponent,
    EmployeeComponent,
    MovementComponent,
    PurchaseComponent,
    ProductionComponent,
    MenuComponent,
    InventoryComponent,
    QualityComponent,
    SalesComponent,
    CalendarComponent,
    OptionsBottomSheetComponent,
    BillingComponent,
    PurchasingComponent,
    SalesIndicatorComponent
  ],
  entryComponents: [
    CalendarComponent,
    OptionsBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatStepperModule,
    MatCardModule,
    MatBottomSheetModule,
    MatTabsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers: [MenuService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
