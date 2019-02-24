import { Component, OnInit } from '@angular/core';
import { VaultService } from "../vault.service";

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {

  result: any;
  message: string;
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
    let alert = confirm(`Are you sure you want to delete password: ${id}?`);
    // Confirm password deletion
    if (alert) {
      console.log("Deleting password: ", id);
      this.vault.deletePassword(id).subscribe( (result) => {
        // If APi call returned properly
        if (result) {
          this.passwords = result;
          this.message = "Successfully deleted " + id;
        }
      });
    }

  }
  
  ngOnInit() {
    this.allPasswords();
  }

}
