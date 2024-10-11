import { Component } from '@angular/core';

import { PagesComponent } from "./pfc/pages/pages-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ PagesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PFC';
}
