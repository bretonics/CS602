import { Component, OnInit } from '@angular/core';
import { VaultService } from "../vault.service";

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  id: number;
  newpassword: string;
  added: any;

  constructor(private vault: VaultService) { }

  //  Vault Services -- Change password in vault
  changePassword(id, newpassword) {
    this.vault.changePassword(id, newpassword).subscribe(result => {
      this.added = result.data;
    });
  }

  ngOnInit() {
  }

}
