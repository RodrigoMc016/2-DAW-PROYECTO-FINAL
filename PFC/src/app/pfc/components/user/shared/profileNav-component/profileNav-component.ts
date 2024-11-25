import { Component } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: 'profileNav-component.html',
  styleUrl:'profileNav-component.scss',
  standalone:true,
  imports:[
    RouterOutlet,
    RouterLink,


  ]
})

export class ProfileNavComponent  {
  constructor(private authService:AuthService, private router:Router) { }

  logout(): void {
    // Llamar al servicio de autenticación para cerrar sesión
    this.authService.logout();

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
