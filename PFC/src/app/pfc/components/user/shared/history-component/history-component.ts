import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'history',
  templateUrl: 'history-component.html',
  styleUrl:'history-component.scss',
  standalone:true,
  imports:[
    NgIf,
    NgFor
  ]
})

export class historyComponent  {
  email: string = '';
  transactions: any[] = [];

  constructor(private authService: AuthService) {}

  //Carga de datos al iniciar la página, en este caso con los el email guardado en la sesión.
  ngOnInit(): void {
    const userData = this.authService.getUserData();
    this.email = userData?.email;

    if (this.email) {
      this.loadTransactions();
    }
  }

  //Carga en pantalla de los movimientos
  loadTransactions(): void {
    this.authService.getTransactions(this.email).subscribe(
      (response) => {
        if (response.message) {
          console.error(response.message); // Mensaje si no hay transacciones
        } else {
          //Si las hay las muestra
          this.transactions = response;
        }
      },
      (error) => {
        console.error('Error al obtener las transacciones:', error);
      }
    );
  }


}
