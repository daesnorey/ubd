import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { PurchaseComponent } from './components/purchase/purchase.component';
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
  MatMenuModule
} from '@angular/material';
import { ProductionComponent } from './components/production/production.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThirdPartyComponent,
    ClientComponent,
    EmployeeComponent,
    PurchaseComponent,
    ProductionComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    NgbModule.forRoot()
  ],
  providers: [MenuService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
