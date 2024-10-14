import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardActions } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';

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
  constructor(private datos: FormBuilder, private router: Router) {
    this.cuenta = this.datos.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      correo: ['', Validators.required],
      politicas: [false, Validators.requiredTrue]
    })


  }
  registroDatos(): void {
    if(this.cuenta.valid){
      console.log('cuenta creada', this.cuenta.value);
      this.router.navigate(['/login']);
    }else{
      console.log('Error');
    }
  }


  irLogin(): void {
    this.router.navigate(['/login']);
  }

}
