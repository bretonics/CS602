import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  response: any;

  constructor(private service: BackendService) { }

  // Login user
  // login(email, password) {
  //   console.log("Sending: ", email, password);
  //   this.service.login(email, password).subscribe( result => {
  //     this.response = result.data;
  //     console.log(this.response);
  //   })
  // }

  ngOnInit() {
  }

}
