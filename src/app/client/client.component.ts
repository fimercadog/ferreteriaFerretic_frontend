import {Component, OnInit} from '@angular/core';
import {ApiService} from "../providers/api.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.get_client()
  }

  get_client() {
    this.api.get('client')
      .subscribe(
        data => {
          console.log(data)
        }
      )
  }
}
