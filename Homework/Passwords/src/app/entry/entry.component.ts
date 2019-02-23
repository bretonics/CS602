import { Component, OnInit } from '@angular/core';
import { VaultService } from "../vault.service";
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  source: string;
  name: string;
  password: string;
  passwords: any;

  constructor(private vault: VaultService) { }
  
  // Hit back end -- Store passwords in vault  
  storePassword(source: string, name: string, password: string) {
    this.vault.storePassword(source, name, password).subscribe( result => {
        this.passwords = result.data;
    });
  }

  ngOnInit() {
  }

}
