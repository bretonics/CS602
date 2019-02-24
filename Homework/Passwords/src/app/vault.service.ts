import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  url: string = "http://localhost:3002/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), 
    withCredentials: true,
  }

  constructor(private http: HttpClient) { }

  // Password Vault API
  allPasswords(): Observable<any> {
    let url: string = `${this.url}passwords`;
    return this.http.get(url, this.httpOptions );
  }

  storePassword(source: string, name: string, password: string): Observable<any> {
    let url: string = `${this.url}passwords/add`;
    return this.http.post(url, { source, name, password }, this.httpOptions);
  }

  changePassword(id: number, newpassword: string): Observable<any> {
    let url: string = `${this.url}passwords/change`;
    return this.http.post(url, { id, newpassword }, this.httpOptions );
  }
  
  deletePassword(id: number): Observable<any> {
    let url: string = `${this.url}passwords/delete/${id}`;
    return this.http.delete(url, this.httpOptions );
  }


}
