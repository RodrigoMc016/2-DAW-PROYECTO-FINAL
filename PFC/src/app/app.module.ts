
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { PfcModule } from "./pfc/pfc.module";







@NgModule({
  declarations: [],

  imports: [
    AppComponent,
    BrowserModule,
    AppRoutingModule,
    PfcModule
  ],




})

export class AppModule { }
