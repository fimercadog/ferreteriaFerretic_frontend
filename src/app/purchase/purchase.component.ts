import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchases:any = []
  show_form_purchases: boolean = false;
  form_purchase = this.fb.group({
    id:[''],
    order_id:[''],
    order_date:[''],
    product_id:[''],
    order_product_quantity:[''],
    order_subtotal:[''],
    order_total:['']
  })
  selectedPurchase: any;
  quantity: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_purchases()
  }

  get_purchases(){
    this.api.get('purchase')
      .subscribe(
        data=>{
          this.purchases = data
          console.log(data)
        }
      )
  }

  save_purchase() {
    this.api.post('purchase', this.form_purchase.value)
      .subscribe(
        data=>{
          if(data != undefined){
            this.get_purchases()
            this.show_form_purchases = false
            this.form_purchase.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_purchase() {
    this.api.update('purchase', this.form_purchase.value, this.form_purchase.value['id'])
      .subscribe(
        data=>{
          if(data != undefined){
            this.get_purchases()
            this.show_form_purchases = false
            this.form_purchase.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_purchase() {
    this.form_purchase.reset()
    this.form_purchase.patchValue({
      id:this.selectedPurchase.id,
      order_id: this.selectedPurchase.order_id,
      order_date: this.selectedPurchase.order_date,
      product_id: this.selectedPurchase.product_id,
      order_product_quantity: this.selectedPurchase.order_product_quantity,
      order_subtotal: this.selectedPurchase.order_subtotal,
      order_total: this.selectedPurchase.order_total,
    })
    this.show_form_purchases = true;
  }

  save(){
    if(this.form_purchase.value['id']){
      this.update_purchase()
    }else {
      this.save_purchase()
    }
  }
}
