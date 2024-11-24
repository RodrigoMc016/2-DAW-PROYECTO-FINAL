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

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    this.email = userData?.email;

    if (this.email) {
      this.loadTransactions();
    }
  }

  loadTransactions(): void {
    this.authService.getTransactions(this.email).subscribe(
      (response) => {
        if (response.message) {
          console.log(response.message); // Mensaje si no hay transacciones
        } else {
          this.transactions = response;
        }
      },
      (error) => {
        console.error('Error al obtener las transacciones:', error);
      }
    );
  }


}
