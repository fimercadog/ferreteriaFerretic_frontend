import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "../providers/api.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients:any=[]

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.get_clients()
  }

  get_clients() {
    this.api.get('client')
      .subscribe(
        data => {
          this.clients=data
          console.log(data)
        }
      )
  }
}
