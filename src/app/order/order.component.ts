import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  employees:any = []
  vendors:any = []
  orders:any = []
  show_form_orders: boolean = false;
  form_order = this.fb.group({
    id:[''],
    vendor_id:[''],
    employee_id:[''],
    order_number:['']
  })
  selectedOrder: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_vendors()
    this.get_employees()
    this.get_orders()
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

  get_employees(){
    this.api.get('employee')
      .subscribe(
        data=>{
          this.employees = data
          console.log(data)
        }
      )
  }

  get_orders(){
    this.api.get('order')
      .subscribe(
        data=>{
          this.orders = data
          console.log(data)
        }
      )
  }

  save_order() {
    this.api.post('order', this.form_order.value)
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_orders()
            this.show_form_orders = false
            this.form_order.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_order() {
    this.api.update('order', this.form_order.value, this.form_order.value['id'])
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_orders()
            this.show_form_orders = false
            this.form_order.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_order() {
    this.form_order.reset()
    this.form_order.patchValue({
      id:this.selectedOrder.id,
      vendor_id: this.selectedOrder.vendor.id,
      employee_id: this.selectedOrder.employee.id,
      order_number: this.selectedOrder.order_number,
    })
    this.show_form_orders = true;
  }

  save(){
    if(this.form_order.value['id']){
      this.update_order()
    }else {
      this.save_order()
    }
  }

  clean_form(){
    this.form_order.reset()
    this.show_form_orders = false
  }
}
