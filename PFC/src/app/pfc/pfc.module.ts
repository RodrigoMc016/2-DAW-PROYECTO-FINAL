import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import { PagesComponent } from "./pages/pages-component";
import { HomeUserComponent } from "./components/user/shared/home-user-component/home-user-component";
import { CommonModule } from "@angular/common";
import { HttpClient,  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from "./components/login-component/login-component";

@NgModule({
  declarations: [],

  imports: [CommonModule,  PagesComponent, LoginComponent, HttpClientModule],

  exports:[ PagesComponent, LoginComponent],

})

export class PfcModule { }
