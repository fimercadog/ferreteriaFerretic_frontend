import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { ApiService } from "./providers/api.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {AuthGuard} from "./providers/auth.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import { ClientComponent } from './client/client.component';
import {TableModule} from 'primeng/table';
import { VendorComponent } from './vendor/vendor.component';
import { OrderComponent } from './order/order.component';
import { EmployeeComponent } from './employee/employee.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductComponent } from './product/product.component';


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
    ProductComponent
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
    TableModule
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
