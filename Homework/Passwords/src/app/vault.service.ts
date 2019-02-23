import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private http: HttpClient) { }

  // Password Vault API
  storePassword(source: string, name: string, password: string): Observable<any> {
      let url: string = `http://localhost:3002/passwords/add?source=${source}&name=${name}&password=${password}`;
      return this.http.post(url, {source, name, password} );
  }




}
