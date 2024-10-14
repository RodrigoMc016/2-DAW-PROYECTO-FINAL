import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFormField, MatLabel, MatHint, MatSuffix, MatError, MatFormFieldControl } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCardActions } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';



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
  constructor(private datos: FormBuilder,  private router:Router, private authService:AuthService ) {
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
      const { email, contrasenia } = this.login.value;
      this.authService.login(email, contrasenia).subscribe(response => {
        if (response.status === 'success') {
          // Redirigir según si es administrador
          if (response.is_admin) {
            this.router.navigate(['/TimelessFlavour-admin/home']); // Ruta para administradores
          } else {
            this.router.navigate(['/TimelessFlavour-admin/home']); // Ruta para usuarios normales
          }
        } else {
          console.error(response.message);
        }
      });
    }
  }
}




