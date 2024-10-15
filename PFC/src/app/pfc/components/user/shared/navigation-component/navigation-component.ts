import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'navBarUser',
  templateUrl: 'navigation-component.html',
  styleUrl: 'navigation-component.scss',
  standalone: true,
  imports:[
    RouterLink
  ]

})

export class navigationComponent {

  constructor(private router:Router) { }


  volverALogin(){
    this.router.navigate(['/login']);
  }


}