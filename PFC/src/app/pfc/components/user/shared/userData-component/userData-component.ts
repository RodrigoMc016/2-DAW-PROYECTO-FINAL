import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'userData',
  templateUrl: 'userData-component.html',
  styleUrl: 'userData-component.scss',
  standalone: true,
  imports:[
    FormsModule,
    NgIf

  ]
})

export class userDataComponent implements OnInit {
  userData: any = null;  // Datos del usuario

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener los datos del usuario almacenados localmente
    const userData = this.authService.getUserData();
    const email = userData?.email;

    if (email) {
      this.loadUserData(email);
    }
  }

  loadUserData(email: string): void {
    this.authService.getUserSession(email).subscribe(
      (response) => {
        this.userData = response;

      },

      
    );
  }

}
