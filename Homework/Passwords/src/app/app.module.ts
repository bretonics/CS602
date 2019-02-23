import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    PasswordsComponent,
    ChangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
