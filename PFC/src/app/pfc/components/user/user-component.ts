import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { navigationComponent } from './shared/navigation-component/navigation-component';

@Component({
  selector: 'user',
  templateUrl: 'user-component.html',
  standalone: true,
  imports:[
    navigationComponent, RouterOutlet
  ]

})

export class UserComponent {
  constructor() { }


}
