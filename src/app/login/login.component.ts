import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../providers/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form_login = this.fb.group({
    username:['masteruser'],
    password:['123456']
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  get_token(){
    console.log(this.form_login.value)
    this.api.login(this.form_login.value)
      .subscribe(
        data=>{
          if(data != undefined){
            this.api.user = data
            this.router.navigate(['/home'])
          }
        }
      )
  }
}

