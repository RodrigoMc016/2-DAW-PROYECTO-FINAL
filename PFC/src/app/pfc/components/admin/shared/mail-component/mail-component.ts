import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mail',
  templateUrl: 'mail-component.html',
  styleUrl:'mail-component.scss',
  standalone:true,
  imports:[
    RouterLink
  ]
})

export class mailComponent  {
  constructor() { }


}
