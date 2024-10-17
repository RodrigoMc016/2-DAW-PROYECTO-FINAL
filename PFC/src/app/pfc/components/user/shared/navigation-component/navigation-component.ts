import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'navBarUser',
  templateUrl: 'navigation-component.html',
  styleUrl: 'navigation-component.scss',
  standalone: true,
  imports:[
    RouterLink,
    MatToolbar
  ]

})

export class navigationComponent {

  constructor(private router:Router) { }


  volverALogin(){
    this.router.navigate(['/login']);
  }


}
