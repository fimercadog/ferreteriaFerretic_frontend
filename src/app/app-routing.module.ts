import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./providers/auth.guard";
import {ClientComponent} from "./client/client.component";
import {EmployeeComponent} from "./employee/employee.component";
import {VendorComponent} from "./vendor/vendor.component";
import {ProductComponent} from "./product/product.component";
import {OrderComponent} from "./order/order.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {PurchaseComponent} from "./purchase/purchase.component";
import {SoldComponent} from "./sold/sold.component";
import {SucursalComponent} from "./sucursal/sucursal.component";

const routes:Routes = [
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'employee', component:EmployeeComponent, canActivate:[AuthGuard]},
  {path:'vendor', component:VendorComponent, canActivate:[AuthGuard]},
  {path:'client', component:ClientComponent, canActivate:[AuthGuard]},
  {path:'product', component:ProductComponent, canActivate:[AuthGuard]},
  {path:'order', component:OrderComponent, canActivate:[AuthGuard]},
  {path:'invoice', component:InvoiceComponent, canActivate:[AuthGuard]},
  {path:'purchase', component:PurchaseComponent, canActivate:[AuthGuard]},
  {path:'sold', component:SoldComponent, canActivate:[AuthGuard]},
  {path:'sucursal', component:SucursalComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:'/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
