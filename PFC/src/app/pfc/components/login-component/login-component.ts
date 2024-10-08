import { Component } from '@angular/core';
import{Router, RouterLink} from '@angular/router';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';


@Component({
  selector: 'login',
  templateUrl: 'login-component.html',
  styleUrls: ['login-component.scss'],
  standalone: true,
  imports:[
     RouterLink,
     MatFormField,
     MatLabel,
     MatHint,
     MatSuffix

  ]
})

export class LoginComponent {



}
