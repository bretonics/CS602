import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any;

  constructor(private service: BackendService) { }

  getUser() {
    this.service.getUser().subscribe( (result) => {
      this.user = result;
      console.log("SET USER:", this.user);
    });
  }

  ngOnInit() {
    this.getUser();
  }

}
