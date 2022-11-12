import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from "primeng/api";
import {ApiService} from "./providers/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] = [];

  constructor(public api: ApiService, private router: Router) {
    this.items = [
      {label: 'gestion de ferreteria'},
      {label: 'gestion de product'},
      {label: 'gestion de employee'},
      {label: 'gestion de vendor'},
      {
        label: 'gestion de client', command: () => {
          this.router.navigate(['/client'])
        }
      },
      {label: 'gestion de invoice'},
      {
        label: 'salir', command: () => {
          this.api.logOut()
        }
      }
    ]
  }
}
