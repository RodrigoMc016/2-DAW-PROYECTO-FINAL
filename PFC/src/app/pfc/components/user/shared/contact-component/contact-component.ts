import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'contact',
  templateUrl: 'contact-component.html',
  styleUrl: 'contact-component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink

  ]
})

export class ContactComponent {

  formularioFeedback: FormGroup;
  constructor(private datos2: FormBuilder, private feedbackService: AuthService) {
    this.formularioFeedback = this.datos2.group({
      email: ["", [Validators.required, Validators.email]],
      rating: ["", [Validators.required]],
      comments: ["", [Validators.required]]
    });

  }


  envioFeedback() {
    if (this.formularioFeedback.valid) {
      console.log(this.formularioFeedback.value);
      this.feedbackService.sendFeedBack(this.formularioFeedback.value).subscribe(response => {
        console.log("Enviado", response);


      }, error => {
        console.error("Error", error);
      });
    }

  }





}
