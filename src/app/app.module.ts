import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from "./app-routing.module";
import { ApiService } from "./providers/api.service";
import { HttpClientModule } from "@angular/common/http";
import {AuthGuard} from "./providers/auth.guard";

import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { VendorComponent } from './vendor/vendor.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SoldComponent } from './sold/sold.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClientComponent,
    VendorComponent,
    OrderComponent,
    EmployeeComponent,
    InvoiceComponent,
    ProductComponent,
    PurchaseComponent,
    SoldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
