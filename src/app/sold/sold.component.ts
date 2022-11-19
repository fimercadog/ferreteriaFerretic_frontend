import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  invoices:any = []
  products:any = []
  sales:any = []
  show_form_sales: boolean = false;
  form_sale = this.fb.group({
    id:[''],
    invoice_id:[''],
    invoice_date:[''],
    product_id:[''],
    invoice_product_quantity:[''],
    invoice_subtotal:[''],
    invoice_total:[''],
    sold_enabled:[''],
  })
  selectedSale: any;
  quantity: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_invoices()
    this.get_products()
    this.get_sales()
  }

  get_invoices(){
    this.api.get('invoice')
      .subscribe(
        data=>{
          this.invoices = data
          console.log(data)
        }
      )
  }

  get_products(){
    this.api.get('product')
      .subscribe(
        data=>{
          this.products = data
          console.log(data)
        }
      )
  }

  get_sales(){
    this.api.get('sold')
      .subscribe(
        data=>{
          this.sales = data
          console.log(data)
        }
      )
  }

  save_sale() {
    this.api.post('sold', this.form_sale.value)
      .subscribe(
        data=>{
          if(data != undefined){
            this.get_sales()
            this.show_form_sales = false
            this.form_sale.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_sale() {
    this.api.update('sold', this.form_sale.value, this.form_sale.value['id'])
      .subscribe(
        data=>{
          if(data != undefined){
            this.get_sales()
            this.show_form_sales = false
            this.form_sale.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_sale() {
    this.form_sale.reset()
    this.form_sale.patchValue({
      id:this.selectedSale.id,
      invoice_id: this.selectedSale.invoice.id,
      invoice_date: this.selectedSale.invoice_date,
      product_id: this.selectedSale.product.id,
      invoice_product_quantity: this.selectedSale.invoice_product_quantity,
      invoice_subtotal: this.selectedSale.invoice_subtotal,
      invoice_total: this.selectedSale.invoice_total,
      sold_enabled: this.selectedSale.sold_enabled,
    })
    this.show_form_sales = true;
  }

  save(){
    if(this.form_sale.value['id']){
      this.update_sale()
    }else {
      this.save_sale()
    }
  }

  clean_form(){
    this.form_sale.reset()
    this.show_form_sales = false
  }
}
