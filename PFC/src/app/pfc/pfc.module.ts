import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import { PagesComponent } from "./pages/pages-component";
import { HomeUserComponent } from "./components/user/shared/home-user-component/home-user-component";
import { CommonModule } from "@angular/common";
import { HttpClient,  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from "./components/login-component/login-component";
import { AccountComponent } from "./components/account-component/account-component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    PagesComponent,
    LoginComponent,
    HttpClientModule,
    AccountComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule],

  exports:[ PagesComponent, LoginComponent, AccountComponent],

})

export class PfcModule { }
