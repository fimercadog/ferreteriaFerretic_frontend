import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendors:any = []
  show_form_vendors: boolean = false;
  form_vendor = this.fb.group({
    id:[''],
    vendor_name:[''],
    vendor_address:[''],
    vendor_telephone:[''],
    vendor_email:[''],
    vendor_enabled:['']
  })
  selectedClient: any;
  options = [
    {label:'Activo', value:true},
    {label:'Inactivo', value:false},
  ]
  selectedVendor: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_vendors()
  }

  get_vendors(){
    this.api.get('vendor')
      .subscribe(
        data=>{
          this.vendors = data
          console.log(data)
        }
      )
  }

  save_vendor() {
    this.api.post('vendor', this.form_vendor.value)
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_vendors()
            this.show_form_vendors = false
            this.form_vendor.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_vendor() {
    this.api.update('vendor', this.form_vendor.value, this.form_vendor.value['id'])
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_vendors()
            this.show_form_vendors = false
            this.form_vendor.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_vendor() {
    this.form_vendor.reset()
    this.form_vendor.patchValue({
      id:this.selectedVendor.id,
      vendor_name: this.selectedVendor.vendor_name,
      vendor_address: this.selectedVendor.vendor_address,
      vendor_telephone: this.selectedVendor.vendor_telephone,
      vendor_email: this.selectedVendor.vendor_email,
      vendor_enabled: this.selectedVendor.vendor_enabled,
    })
    this.show_form_vendors = true;
  }

  save(){
    if(this.form_vendor.value['id']){
      this.update_vendor()
    }else {
      this.save_vendor()
    }
  }

  clean_form(){
    this.form_vendor.reset()
    this.show_form_vendors = false
  }
}
