import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login-component/login-component';



@Component({
  selector: 'main-page',
  templateUrl: 'pages-component.html',
  styleUrls: ['pages-component.scss'],
  standalone: true,
  imports: [
    RouterOutlet

]

})

export class PagesComponent  {



}
