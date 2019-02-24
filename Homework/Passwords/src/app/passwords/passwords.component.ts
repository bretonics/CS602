import { Component, OnInit } from '@angular/core';
import { VaultService } from "../vault.service";

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {

  passwords: any[];

  constructor(private vault: VaultService) { }

  //  Vault Services -- Get all passwords API
  allPasswords() {
    console.log("Calling vault services...");
    this.vault.allPasswords().subscribe( (result: any[]) => {
      this.passwords = result;
    });
  }

  deletePassword(id: number){
    console.log("Deleting password: ", id);
    
  }
  
  ngOnInit() {
    this.allPasswords();
  }

}
