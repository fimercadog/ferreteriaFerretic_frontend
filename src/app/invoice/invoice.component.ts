import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  employees:any = []
  clients:any = []
  invoices:any = []
  show_form_invoices: boolean = false;
  form_invoice = this.fb.group({
    id:[''],
    client_id:[''],
    employee_id:[''],
    invoice_number:[''],
    invoice_enabled:[''],
  })
  selectedClient: any;
  options = [
    {label:'Activo', value:true},
    {label:'Inactivo', value:false},
  ]
  selectedInvoice: any;


  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_clients()
    this.get_employees()
    this.get_invoices()
  }

  get_clients(){
    this.api.get('client')
      .subscribe(
        data=>{
          this.clients = data
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

  get_invoices(){
    this.api.get('invoice')
      .subscribe(
        data=>{
          this.invoices = data
          console.log(data)
        }
      )
  }

  save_invoice() {
    this.api.post('invoice', this.form_invoice.value)
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_invoices()
            this.show_form_invoices = false
            this.form_invoice.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_invoice() {
    this.api.update('invoice', this.form_invoice.value, this.form_invoice.value['id'])
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_invoices()
            this.show_form_invoices = false
            this.form_invoice.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_invoice() {
    this.form_invoice.reset()
    this.form_invoice.patchValue({
      id:this.selectedInvoice.id,
      client_id: this.selectedInvoice.client.id,
      employee_id: this.selectedInvoice.employee.id,
      invoice_number: this.selectedInvoice.invoice_number,
      invoice_enabled: this.selectedInvoice.invoice_enabled
    })
    this.show_form_invoices = true;
  }

  save(){
    if(this.form_invoice.value['id']){
      this.update_invoice()
    }else {
      this.save_invoice()
    }
  }

  clean_form(){
    this.form_invoice.reset()
    this.show_form_invoices = false
  }
}
