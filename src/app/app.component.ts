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

  constructor(public api:ApiService, private router:Router) {
    this.items = [
      {label:'Gestión de Empleado', command: (event) =>{
          this.router.navigate(['/employee'])
        }},
      {label:'Gestión de Proveedor', command: (event) =>{
          this.router.navigate(['/vendor'])
        }},
      {label:'Gestión de Cliente', command: (event) =>{
          this.router.navigate(['/client'])
        }},
      {label:'Gestión de Producto', command: (event) =>{
          this.router.navigate(['/product'])
        }},
      {label:'Gestión de Pedido', command: (event) =>{
          this.router.navigate(['/order'])
        }},
      {label:'Gestión de Factura', command: (event) =>{
          this.router.navigate(['/invoice'])
        }},
      {label:'Compras', command: (event) =>{
          this.router.navigate(['/purchase'])
        }},
      {label:'Ventas', command: (event) =>{
      this.router.navigate(['/sold'])
    }},
      {label:'Salir', command: (event) => {this.api.logout()}},
    ]
  }
}
