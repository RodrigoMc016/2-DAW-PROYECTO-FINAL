import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import{MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../../../services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'navBarAdmin',
  templateUrl: 'navigationAdmin-component.html',
  styleUrl: 'navigationAdmin-component.scss',
  standalone: true,
  imports:[
    RouterLink,
    MatMenuModule,
    MatIcon

  ]

})

export class navigationAdminComponent {

  constructor(private router:Router, private authService:AuthService) { }

  adminlogout():void{
    this.authService.logout();
  }

  volverALogin(){
    this.router.navigate(['/login']);
  }


}
