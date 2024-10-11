import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; // Solo necesitas el enrutador
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [], // No necesitas declarar ningún componente
  imports: [
    BrowserModule,
    AppRoutingModule,  // Aquí está la configuración del enrutador
    ReactiveFormsModule
  ]
})
export class AppModule { }
