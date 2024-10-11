import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFormField, MatLabel, MatHint, MatSuffix, MatError, MatFormFieldControl } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCardActions } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';



@Component({
  selector: 'login',
  templateUrl: 'login-component.html',
  styleUrls: ['login-component.scss'],
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



  ]
})

export class LoginComponent {

  login: FormGroup;
  /*router:any */
  constructor(private datos: FormBuilder,  private router:Router ) {
    this.login = this.datos.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.required],
      politicas: [false, Validators.requiredTrue]
    })


  }


  hide = true;
  isChecked: boolean = false;



  enviar() {
    if (this.login.valid) {
      console.log(this.login.value);
      // this.router.navigate(['/RiotFlash/inicio']);

    } else {
      console.log('Por favor, rellena todos los campos');

    }
  }
}



