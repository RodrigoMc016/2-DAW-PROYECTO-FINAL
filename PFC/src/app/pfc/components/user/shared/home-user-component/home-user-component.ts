
import { Component  } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'home-user',
  templateUrl: 'home-user-component.html',
  styleUrls : ['home-user-component.scss'],
  standalone: true,
  imports:[
    NgFor,
    RouterLink
  ]
})

export class homeUserComponent  {



}
