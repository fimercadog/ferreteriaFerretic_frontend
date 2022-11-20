import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:any = []
  show_form_products: boolean = false;
  form_product = this.fb.group({
    id:[''],
    product_name:[''],
    product_description:[''],
    product_price:[''],
    product_stock:[''],
    product_enabled: ['']
  })
  selectedClient: any;
  options = [
    {label:'Activo', value:true},
    {label:'Inactivo', value:false},
  ]
  selectedProduct: any;
  price: any;
  quantity: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_products()
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

  save_product() {
    this.api.post('product', this.form_product.value)
      .subscribe(
        data=>{
          if(data != undefined){
            this.get_products()
            this.show_form_products = false
            this.form_product.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_product() {
    this.api.update('product', this.form_product.value, this.form_product.value['id'])
      .subscribe(
        data=>{
          if(data != undefined){
            this.get_products()
            this.show_form_products = false
            this.form_product.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_product() {
    this.form_product.reset()
    this.form_product.patchValue({
      id:this.selectedProduct.id,
      product_name: this.selectedProduct.product_name,
      product_description: this.selectedProduct.product_description,
      product_price: this.selectedProduct.product_price,
      product_stock: this.selectedProduct.product_stock,
      product_enabled: this.selectedProduct.product_enabled,
    })
    this.show_form_products = true;
  }

  save(){
    if(this.form_product.value['id']){
      this.update_product()
    }else {
      this.save_product()
    }
  }

  clean_form(){
    this.form_product.reset()
    this.show_form_products = false
  }
}
