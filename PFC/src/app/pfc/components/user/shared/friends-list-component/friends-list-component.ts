import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { confirmationDialogComponent } from '../dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'friends',
  templateUrl: 'friends-list-component.html',
  styleUrl: 'friends-list-component.scss',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    confirmationDialogComponent
  ]
})

export class friendsComponent {
  email: string = ''; // Email del usuario logueado
  friends: any[] = []; // Lista de amigos
  newFriendUsername: string = ''; // Nombre del nuevo amigo
  amounts: { [key: number]: number } = {};

  constructor(private authService: AuthService, public dialog:MatDialog) { }

  ngOnInit(): void {
    // Cargar los datos del usuario logueado
    const userData = this.authService.getUserData();
    if (userData) {
      this.email = userData.email;
      this.loadFriends();
    }
  }

  // Cargar la lista de amigos
  loadFriends(): void {
    this.authService.getFriends(this.email).subscribe(
      (response) => {
        this.friends = response;
      },
      (error) => {
        console.error('Error al cargar los amigos:', error);
      }
    );
  }

  // Agregar un nuevo amigo
  addFriend(): void {
    this.authService.addFriend(this.email, this.newFriendUsername).subscribe(
      (response: any) => {
        if (response.success) {
          alert(`Se ha agregado a ${response.friend_username}`);
          this.newFriendUsername = ''; // Limpia el campo de entrada
          this.loadFriends();
        } else {
          alert(response.error);
        }
      },
      (error) => {
        console.error('Error al agregar amigo:', error);
      }
    );
  }
  sendBalance(receiverEmail: string, points: number): void {
    if (!receiverEmail || points <= 0) {
      this.dialog.open(confirmationDialogComponent, {
        data: {
          title: 'Datos inválidos',
          message: 'Por favor, ingresa un destinatario y una cantidad válida.',
        },
      });
      return;
    }

    console.log("Datos enviados al backend:", {
      senderEmail: this.email,
      receiverEmail: receiverEmail,
      points: points
    });

    this.authService.sendBalance({
      senderEmail: this.email,
      receiverEmail: receiverEmail,
      points: points
    }).subscribe(
      (response: any) => {
        console.log("Respuesta del backend:", response);

        if (response.error) {  // Verifica si hubo un error
          this.dialog.open(confirmationDialogComponent, {
            data: {
              title: 'Error',
              message: response.error, // Muestra el mensaje de error del backend
            },
          });
        } else {
          this.dialog.open(confirmationDialogComponent, {
            data: {
              title: '¡Transferencia realizada!',
              message: 'La transferencia se completó exitosamente.',
            },
          }).afterClosed().subscribe(() => {
            window.location.reload(); // Recargar la página tras cerrar el modal
          });
        }
      },
      (error) => {
        this.dialog.open(confirmationDialogComponent, {
          data: {
            title: 'Error de conexión',
            message: 'Ocurrió un error al realizar la transferencia.',
          },
        });
      }
    );
  }

  // Eliminar a un amigo
  removeFriend(friendId: number): void {
    this.authService.removeFriend(this.email, friendId).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Amigo eliminado exitosamente');
          this.loadFriends(); // Recarga la lista de amigos
        } else {
          alert(response.error);
        }
      },
      (error) => {
        console.error('Error al eliminar amigo:', error);
      }
    );
  }
}


