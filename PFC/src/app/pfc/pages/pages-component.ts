import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PfcModule } from "../pfc.module";


@Component({
  selector: 'main-page',
  templateUrl: 'pages-component.html',
  styleUrls: ['pages-component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    PfcModule
]

})

export class PagesComponent  {



}
