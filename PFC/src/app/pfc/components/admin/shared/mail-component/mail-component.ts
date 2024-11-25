import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'mail',
  templateUrl: 'mail-component.html',
  styleUrl:'mail-component.scss',
  standalone:true,
  imports:[
    RouterLink,
    NgIf,
    NgFor
  ]
})

export class mailComponent  {
  feedbacks: any[] = []; // Array para almacenar los feedbacks
  message: string = '';  // Mensaje de error o éxito

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFeedbacks();  // Cargar los feedbacks al iniciar el componente
  }

  // Método para cargar los feedbacks
  loadFeedbacks(): void {
    this.authService.getFeedback().subscribe({
      next: (data) => {
        this.feedbacks = data;  // Asignar los datos recibidos
      },
      error: (err) => {
        this.message = 'Error al obtener los feedbacks: ' + err.error?.message || 'Error desconocido';
      }
    });
  }

}
