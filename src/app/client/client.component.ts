import {Component, OnInit} from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  clients:any = []
  show_form_clients: boolean = false;
  form_client = this.fb.group({
    id:[''],
    client_name:[''],
    client_lastname:[''],
    client_address:[''],
    client_telephone:[''],
    client_email:[''],
    client_enabled:['']
  })
  selectedClient: any;
  options = [
  {label:'Activo', value:true},
    {label:'Inactivo', value:false},
  ]

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_clients()
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

  save_client() {
    this.api.post('client', this.form_client.value)
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_clients()
            this.show_form_clients = false
            this.form_client.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_client() {
    this.api.update('client', this.form_client.value, this.form_client.value['id'])
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_clients()
            this.show_form_clients = false
            this.form_client.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_client() {
    this.form_client.reset()
    this.form_client.patchValue({
      id:this.selectedClient.id,
      client_name: this.selectedClient.client_name,
      client_lastname: this.selectedClient.client_lastname,
      client_address: this.selectedClient.client_address,
      client_telephone: this.selectedClient.client_telephone,
      client_email: this.selectedClient.client_email,
      client_enabled: this.selectedClient.client_enabled
    })
    this.show_form_clients = true;
  }

  save(){
    if(this.form_client.value['id']){
      this.update_client()
    }else {
      this.save_client()
    }
  }

  clean_form(){
    this.form_client.reset()
    this.show_form_clients = false
  }
}
