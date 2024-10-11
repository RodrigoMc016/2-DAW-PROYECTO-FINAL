

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule),
        provideAnimationsAsync(),
        provideHttpClient()
    ]
})
  .catch(err => console.error(err));
