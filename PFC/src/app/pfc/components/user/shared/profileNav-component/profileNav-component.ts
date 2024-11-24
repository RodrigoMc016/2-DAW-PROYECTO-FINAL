import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: 'profileNav-component.html',
  styleUrl:'profileNav-component.scss',
  standalone:true,
  imports:[
    RouterOutlet,
    RouterLink

  ]
})

export class ProfileNavComponent  {
  constructor() { }


}
