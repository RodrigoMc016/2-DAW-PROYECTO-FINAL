import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-Admin',
  templateUrl: 'admin-home-component.html',
  styleUrl:'admin-home-component.scss',
  standalone:true,
  imports:[
    RouterLink,
    

  ]

})

export class homeAdminComponent  {
  constructor() { }


}
