import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ApiService} from "./providers/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] = [];

  constructor(public api:ApiService) {
    this.items = [
      {label: 'gestion de ferreteria'},
      {label: 'gestion de sala'},
      {label: 'gestion de pelicula'},
      {label: 'gestion de funcion'},
      {label: 'gestion de boleta'},
      {label: 'gestion de cliente'},
      {
        label: 'salir', command: () => {
          this.api.logOut()
        }
      }
    ]
  }
}
