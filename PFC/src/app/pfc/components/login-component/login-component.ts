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
  //el formBuilder es un metodo que engloba al formGroup y hace mas sencilla la sintaxis y la longitud del código mas corta
  constructor(private datos: FormBuilder,  private router:Router, private authService:AuthService ) {
    this.login = this.datos.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.required],

    })


  }


  hide = true; //para ver o no la contraseña en principio oculta
  isChecked: boolean = false;


  enviar() {
    if (this.login.valid) {
      const { email, contrasenia } = this.login.value; //validacion de parametros

      this.authService.login(email, contrasenia).subscribe(
        response => {
          if (response.status === 'success') {


            // Almacenar los datos del usuario en sessionStorage
            const userData = {
              email: email,
              balance: response.balance, // Asegúrate de que el balance esté en la respuesta
              role_id: response.role_id,
            };
            this.authService.setUserData(userData); // Guarda los datos del usuario en el servicio

            // Redirigir según si es administrador
            if (response.is_admin) {
              this.router.navigateByUrl('TimelessFlavour-admin/home-admin'); // Ruta para administradores
            } else {
              this.router.navigateByUrl('TimelessFlavour/home'); // Ruta para usuarios normales
            }
          } else {
            console.log(response.message);
          }
        }

      );

   
    }
  }
}




