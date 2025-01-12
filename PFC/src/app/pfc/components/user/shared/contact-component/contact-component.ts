import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'contact',
  templateUrl: 'contact-component.html',
  styleUrl: 'contact-component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf

  ]
})

export class ContactComponent {

  formularioFeedback: FormGroup;
  mensaje : string | null = null; //puede ser un  mensaje lleno o vacio que sale dependiendo de si los datos se han enviado o hay algún fallo


  constructor(private datos2: FormBuilder, private feedbackService: AuthService) {
    this.formularioFeedback = this.datos2.group({
      email: ["", [Validators.required, Validators.email]],
      rating: ["", [Validators.required]],
      comments: ["", [Validators.required]]
    });

  }


  envioFeedback() {
    if (this.formularioFeedback.valid) {

      this.feedbackService.sendFeedBack(this.formularioFeedback.value).subscribe(response => {

        this.mensaje = response.resultado ||  "Feedback enviado con éxito."; //asignar una respuesta al mensaje que devuelve
        this.formularioFeedback.reset(); /*todos los campos se vuelven a resetear una vez enviado*/

      }, error => {
    
        this.mensaje="Ha ocurrido un error, por favor inténtelo de nuevo."
      });
    }else{
      this.mensaje="Por favor, completa todos los campos de manera adecuada.";
    }

  }





}
