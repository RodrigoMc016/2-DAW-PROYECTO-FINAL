import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { navigationAdminComponent } from './shared/navigationAdmin-component/navigationAdmin-component';

@Component({
  selector: 'admin',
  templateUrl: 'admin-component.html',
  styleUrl:'admin-component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    navigationAdminComponent

  ]
})

export class adminComponent  {
  constructor() { }


}
