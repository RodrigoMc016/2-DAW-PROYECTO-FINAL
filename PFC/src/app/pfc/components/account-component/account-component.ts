import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardActions } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'account',
  templateUrl: 'account-component.html',
  styleUrls: ['account-component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatCheckbox,
    MatCardActions,
    MatButton,
    RouterLink,
  ],
})

export class AccountComponent {

  hide = true; //para ver la contraseña
  isChecked: boolean = false; //para saber si esta marcado el checkbox de las politicas
  cuenta: FormGroup; // crear un formulario
  constructor(private datos: FormBuilder, private router: Router, private authService: AuthService) {
    this.cuenta = this.datos.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      correo: ['', Validators.required],
      politicas: [false, Validators.requiredTrue]
    })


  }
  registroDatos(): void {
    if (this.cuenta.valid) {
      console.log('Enviando datos:', this.cuenta.value);  // Verifica los datos que se envían
      this.authService.registro(this.cuenta.value.usuario, this.cuenta.value.correo, this.cuenta.value.contrasenia).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Error en el registro:', error);
        }
      );
    } else {
      console.log('Error: El formulario no es válido');
    }
  }
  irLogin(): void {
    this.router.navigate(['/login']);
  }

}
