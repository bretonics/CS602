import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit {

  email: string;
  password: string;
  type: string;
  user: any;

  constructor(private service: BackendService) { }

  open(email, password, type) {
    this.service.open(email, password, type).subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  }

  ngOnInit() {
  }

}
