import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { PasswordsComponent } from "./passwords/passwords.component";
import { ChangeComponent } from "./change/change.component";

const routes: Routes = [
    { path: 'entry', component: EntryComponent },
    { path: 'change', component: ChangeComponent },
    { path: 'passwords', component: PasswordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
