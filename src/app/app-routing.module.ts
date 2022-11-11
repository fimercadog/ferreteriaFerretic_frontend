import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./providers/auth.guard";

const routes:Routes = [
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo:'/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
