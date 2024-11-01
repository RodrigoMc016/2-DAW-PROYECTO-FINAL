import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: 'profile-component.html',
  styleUrl:'profile-component.scss',
  standalone:true,
  imports:[
    RouterOutlet

  ]
})

export class ProfileComponent  {
  constructor() { }


}
