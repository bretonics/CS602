import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url: string = "http://localhost:3000/api/accounts/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  }

  // payload = { user: {email: "", password:""} };
  user: any;

  constructor(private http: HttpClient) { }

  // Login Route
  // login(email, password): Observable<any> {
  //   console.log("Received: ", email, password);

  //   let url: string = `${this.url}login`;
  //   let payload = this.payload;
  //   payload.user.email = email;
  //   payload.user.password = password;

  //   console.log("Sending: ", payload);

  //   return this.http.post(url, JSON.stringify(payload), this.httpOptions);
  // }

  open(email, password, type): Observable<any> {
    let url: string = `${this.url}open`;
    console.log("Sending: ", email, password,type);
    this.user = this.http.post(url, { email, password, type }, this.httpOptions);
    return this.user;
  }

  getUser() { console.log("SENDING", this.user); return this.user; }


  // function(): Observable<any> {
    // let url: string = `${this.url}`;
  // }

  // function(): Observable<any> {
    // let url: string = `${this.url}`;
  // }


}

