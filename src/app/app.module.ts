import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuService } from './services/menu.service';
import { ThirdPartyComponent } from './components/third-party/third-party.component';
import { ClientComponent } from './components/third-party/client/client.component';
import { EmployeeComponent } from './components/third-party/employee/employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseComponent } from './components/purchase/purchase.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThirdPartyComponent,
    ClientComponent,
    EmployeeComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [MenuService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
