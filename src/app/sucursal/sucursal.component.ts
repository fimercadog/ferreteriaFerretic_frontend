import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  sucursales:any = []
  show_form_sucursales: boolean = false;
  form_sucursal = this.fb.group({
    id:[''],
    sucursal_name:[''],
    sucursal_address:[''],
    sucursal_enabled:[''],

  })
  selectedSucursal: any;
  options = [
    {label:'Activo', value:true},
    {label:'Inactivo', value:false},
  ]

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_sucursales()
  }

  get_sucursales(){
    this.api.get('sucursal')
      .subscribe(
        data=>{
          this.sucursales = data
          console.log(data)
        }
      )
  }

  save_sucursal() {
    this.api.post('sucursal', this.form_sucursal.value)
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_sucursales()
            this.show_form_sucursales = false
            this.form_sucursal.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_sucursal() {
    this.api.update('sucursal', this.form_sucursal.value, this.form_sucursal.value['id'])
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_sucursales()
            this.show_form_sucursales = false
            this.form_sucursal.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_sucursal() {
    this.form_sucursal.reset()
    this.form_sucursal.patchValue({
      id:this.selectedSucursal.id,
      sucursal_name: this.selectedSucursal.sucursal_name,
      sucursal_address: this.selectedSucursal.sucursal_address,
      sucursal_enabled: this.selectedSucursal.sucursal_enabled
    })
    this.show_form_sucursales = true;
  }

  save(){
    if(this.form_sucursal.value['id']){
      this.update_sucursal()
    }else {
      this.save_sucursal()
    }
  }

  clean_form(){
    this.form_sucursal.reset()
    this.show_form_sucursales = false
  }
}
