import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'navBarAdmin',
  templateUrl: 'navigationAdmin-component.html',
  styleUrl: 'navigationAdmin-component.scss',
  standalone: true,
  imports:[
    RouterLink
  ]

})

export class navigationAdminComponent {

  constructor(private router:Router) { }


  volverALogin(){
    this.router.navigate(['/login']);
  }


}
