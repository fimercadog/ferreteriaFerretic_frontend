import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  orders:any = []
  products:any = []
  purchases:any = []
  show_form_purchases: boolean = false;
  form_purchase = this.fb.group({
    id:[''],
    order_id:[''],
    order_date:[''],
    product_id:[''],
    order_product_quantity:[''],
    matriz_productos:[''],
    order_subtotal:[''],
    order_total:['0'],
    purchase_enabled:['True'],
  })
  options = [
    {label:'Activo', value:true},
    {label:'Inactivo', value:false},
  ]
  selectedPurchase: any;
  quantity: any;
  disabled: boolean = true;
  product_name: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_orders()
    this.get_products()
    this.get_purchases()
  }


  calculatePurchaseTotal(order_number: any) {
    let total = 0;

    if (this.purchases) {
      for (let purchase of this.purchases) {
        if (purchase.order.order_number === order_number) {
          total += purchase.order_subtotal;
        }
      }
    }

    return total;
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

  get_products(){
    this.api.get('product')
      .subscribe(
        data=>{
          this.products = data
          console.log(data)
        }
      )
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
    this.form_purchase.patchValue({
      matriz_productos:JSON.stringify(this.products(this.form_purchase.value))
    })
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
      order_id: this.selectedPurchase.order.id,
      order_date: this.selectedPurchase.order_date,
      product_id: this.selectedPurchase.product.id,
      order_product_quantity: this.selectedPurchase.order_product_quantity,
      matriz_productos: this.selectedPurchase.matriz_productos,
      order_subtotal: this.selectedPurchase.order_subtotal,
      order_total: this.selectedPurchase.order_total,
      purchase_enabled: this.selectedPurchase.purchase_enabled,
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

  clean_form(){
    this.form_purchase.reset()
    this.show_form_purchases = false
  }

  crear_matriz_produtos(purchase:any){
    let matriz=[]
    for(let i=0;i<purchase.order_product_quantity;i++){
      matriz.push({'product':i,'en_uso':false})
    }
    return matriz
  }

  ver_matriz(sala:any) {
    console.log(JSON.parse(this.purchases.matriz_productos))
  }
}
