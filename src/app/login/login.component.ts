import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../providers/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form_login = this.fb.group({
    username:[''],
    password:['']
  })

  constructor(private fb:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
  }

  get_token(){
    console.log(this.form_login.value)
    this.api.login(this.form_login.value)
      .subscribe(
        data=>{
          console.log(data)
        }
      )
  }
}
