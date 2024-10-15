import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login-component/login-component';
import { adminComponent } from '../components/admin/admin-component';
import { UserComponent } from '../components/user/user-component';
import { homeAdminComponent } from "../components/admin/shared/admin-home-component/admin-home-component";
import { homeUserComponent } from '../components/user/shared/home-user-component/home-user-component';



@Component({
  selector: 'main-page',
  templateUrl: 'pages-component.html',
  styleUrls: ['pages-component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    adminComponent,
    UserComponent,
    homeAdminComponent,
    homeUserComponent
]

})

export class PagesComponent  {



}
