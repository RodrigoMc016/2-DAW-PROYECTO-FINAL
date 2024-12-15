import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'promos',
  templateUrl: 'promotions-component.html',
  styleUrl:'promotions-component.scss',
  standalone:true,
  imports:[
    NgFor, NgIf
  ]
})

export class promoUserComponent  {
  promoCodes: any[] = [];
  errorMessage:string ="";
  constructor( private authService:AuthService) { }
  ngOnInit(): void {
    this.loadPromoCodes();
  }

  loadPromoCodes(): void {
    this.authService.getPromos().subscribe({
      next: (data) => {
        this.promoCodes = data;
        console.log('Códigos promocionales obtenidos:', this.promoCodes);
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener los códigos promocionales';
        console.error(this.errorMessage, err);
      }
    });
  }

}
