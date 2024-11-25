import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'home-Admin',
  templateUrl: 'admin-home-component.html',
  styleUrl:'admin-home-component.scss',
  standalone:true,

  imports:[
    NgFor,
    NgIf,
    RouterLink



  ]

})

export class homeAdminComponent  {

  users: any[] = [];  //ARRAY PARA USUARIOS OBTENIDOS
  constructor(private authService:AuthService) { }
  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (data) => {
        this.users = data; // Asigna los datos a la variable users
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

}
