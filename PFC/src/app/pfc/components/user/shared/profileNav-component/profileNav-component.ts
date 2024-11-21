import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: 'profileNav-component.html',
  styleUrl:'profileNav-component.scss',
  standalone:true,
  imports:[
    RouterOutlet

  ]
})

export class ProfileNavComponent  {
  constructor() { }


}
